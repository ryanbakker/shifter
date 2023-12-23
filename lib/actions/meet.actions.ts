"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import Category from "../database/models/category.model";
import {
  CreateMeetParams,
  DeleteMeetParams,
  GetAllMeetsParams,
  GetMeetsByUserParams,
  GetRelatedMeetsByCategoryParams,
  UpdateMeetParams,
} from "@/types";
import Meet from "../database/models/meet.model";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateMeet = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

// CREATE
export async function createMeet({ userId, meet, path }: CreateMeetParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newMeet = await Meet.create({
      ...meet,
      category: meet.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newMeet));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE MEET BY ID
export async function getMeetById(meetId: string) {
  try {
    await connectToDatabase();

    const meet = await populateMeet(Meet.findById(meetId));

    if (!meet) throw new Error("Meet not found");

    return JSON.parse(JSON.stringify(meet));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateMeet({ userId, meet, path }: UpdateMeetParams) {
  try {
    await connectToDatabase();

    const meetToUpdate = await Meet.findById(meet._id);
    if (!meetToUpdate || meetToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or meet not found");
    }

    const updatedMeet = await Meet.findByIdAndUpdate(
      meet._id,
      { ...meet, category: meet.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedMeet));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteMeet({ meetId, path }: DeleteMeetParams) {
  try {
    await connectToDatabase();

    const deletedMeet = await Meet.findByIdAndDelete(meetId);
    if (deletedMeet) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL MEETS
export async function getAllMeets({
  query,
  limit = 6,
  page,
  category,
}: GetAllMeetsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const meetsQuery = Meet.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const meets = await populateMeet(meetsQuery);
    const meetsCount = await Meet.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(meets)),
      totalPages: Math.ceil(meetsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET MEETS BY ORGANIZER
export async function getMeetsByUser({
  userId,
  limit = 6,
  page,
}: GetMeetsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const meetsQuery = Meet.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const meets = await populateMeet(meetsQuery);
    const meetsCount = await Meet.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(meets)),
      totalPages: Math.ceil(meetsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED MEETS: MEETS WITH SAME CATEGORY
export async function getRelatedMeetsByCategory({
  categoryId,
  meetId,
  limit = 3,
  page = 1,
}: GetRelatedMeetsByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: meetId } }],
    };

    const meetsQuery = Meet.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const meets = await populateMeet(meetsQuery);
    const meetsCount = await Meet.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(meets)),
      totalPages: Math.ceil(meetsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
