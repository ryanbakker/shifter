"use client";

import * as z from "zod";
import { IMeet } from "@/lib/database/models/meet.model";
import { meetFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUploadThing } from "@/lib/uploadthing";
import { createMeet, updateMeet } from "@/lib/actions/meet.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { FileUploader } from "./FileUploader";
import { meetDefaultValues } from "@/constants";
import { CalendarDays, DollarSign, Link, MapPin } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Dropdown from "./Dropdown";

type MeetFormProps = {
  userId: string;
  type: "Create" | "Update";
  meet?: IMeet;
  meetId?: string;
};

function MeetForm({ userId, type, meet, meetId }: MeetFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const initialValues =
    meet && type === "Update"
      ? {
          ...meet,
          startDateTime: new Date(meet.startDateTime),
          endDateTime: new Date(meet.endDateTime),
        }
      : meetDefaultValues;

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof meetFormSchema>>({
    resolver: zodResolver(meetFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof meetFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newMeet = await createMeet({
          meet: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newMeet) {
          form.reset();
          router.push(`/meets/${newMeet._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!meetId) {
        router.back();
        return;
      }

      try {
        const updatedMeet = await updateMeet({
          userId,
          meet: { ...values, imageUrl: uploadedImageUrl, _id: meetId },
          path: `/meets/${meetId}`,
        });

        if (updatedMeet) {
          form.reset();
          router.push(`/meets/${updatedMeet._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="What is it"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="What's it about"
                    {...field}
                    className="textarea rounded-2xl resize-none border-transparent focus:border-transparent focus:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-md bg-gray-800 px-4 py-2">
                    <MapPin stroke="lightGrey" size={23} />
                    <Input
                      placeholder="Where's it happening"
                      {...field}
                      className="bg-gray-800 h-[54px] focus-visible:ring-offset-0 placeholder:text-gray-400 text-slate-200 rounded-md py-3 border-none focus-visible:ring-transparent autofill:bg-gray-800 !important"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-md bg-gray-800 px-4 py-2">
                    <DollarSign stroke="lightGrey" size={36} />
                    <Input
                      type="number"
                      placeholder="How much is entry"
                      {...field}
                      className="border-0 bg-gray-800 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-slate-200"
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opactiy-70 text-slate-300"
                              >
                                Free Event
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-slate-300"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-md bg-gray-800 px-4 py-2">
                    <Link stroke="lightGrey" size={22} />
                    <Input
                      placeholder="Is there a link for additional info"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex flex-row items-center justify-between h-[55px] w-full overflow-hidden rounded-md bg-gray-800 pl-4 py-2">
                    <div className="flex flex-row items-center">
                      <CalendarDays stroke="lightGrey" />
                      <p className="ml-3 whitespace-nowrap placeholder:text-gray-400 text-slate-200">
                        Start Date: &nbsp;
                      </p>
                    </div>

                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      className="cursor-pointer bg-gray-800 placeholder:text-gray-400 text-slate-200"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex flex-row items-center justify-between h-[55px] w-full overflow-hidden rounded-md bg-gray-800 pl-4 py-2">
                    <div className="flex flex-row items-center">
                      <CalendarDays stroke="lightGrey" />
                      <p className="ml-3 whitespace-nowrap placeholder:text-gray-400 text-slate-200">
                        End Date: &nbsp;
                      </p>
                    </div>

                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      className="cursor-pointer bg-gray-800 placeholder:text-gray-400 text-slate-200"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
          <Button
            size="lg"
            className="w-full py-6 sm:py-5 sm:max-w-40 bg-gray-200 hover:bg-slate-300 text-slate-700  mt-4"
            disabled={form.formState.isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="lg"
            className="w-full py-6 sm:py-5 sm:max-w-40 bg-red-500 hover:bg-red-700 mt-4"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Event`}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default MeetForm;
