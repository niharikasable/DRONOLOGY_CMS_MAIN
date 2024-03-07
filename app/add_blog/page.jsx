"use client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import supabase from "@/supabase/config";
import TipTap from "@/components/TipTap";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddBlog() {
  const router = useRouter();
  const [imageURL, setImageURL] = useState("");
  const [isSavingImage, setIsSavingImage] = useState(false);

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      blog_title: "",
      blog_description: "",
      blog_thumbnail: "",
    },
  });

  const { watch, setValue } = form;

  const values = watch();

  const insertBlog = async () => {
    const { error } = await supabase.from("blogs").insert(values);

    if (error) {
      alert("error uploading blog");
    } else {
      alert("Blog uploaded");
      router.push("/all_blogs");
    }
  };

  const saveImage = async (e) => {
    e.preventDefault();
    setIsSavingImage(true);

    // Assuming blog_thumbnail is a valid URL
    setImageURL(values.blog_thumbnail);

    setIsSavingImage(false);
  };

  const onSubmit = (data) => {
    // Log the form data to the console
    // console.log("Form submitted with data:", data);
    insertBlog();
    // console.log(values);
  };

  return (
    <main className="min-h-screen p-10">
      <Button asChild variant="outline">
        <Link href="/all_blogs">
          <ChevronLeft className="mr-1 h-5 w-5" />
          All Blogs
        </Link>
      </Button>

      {/* Hello */}

      <h1 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
        Add new blog
      </h1>

      {/* //* Blog inputs starts here */}
      <div className="mt-12">
        {/* //* For main heading*/}
        <Form {...form}>
          <form
            className="flex flex-col gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex justify-start gap-10">
              {/* //? Form Field for blog title*/}
              <FormField
                control={form.control}
                name="blog_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter blog title here ..."
                        className="font-medium text-lg p-6 w-96"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* //? END: Form Field for blog title*/}

              {/* //? Form Field for thumbnail*/}
              <FormField
                control={form.control}
                name="blog_thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog thumbnail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter image URL here ..."
                        className="font-medium text-lg p-6"
                        value={values.blog_thumbnail}
                        onChange={(e) =>
                          setValue("blog_thumbnail", e.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button onClick={saveImage} disabled={isSavingImage}>
                {isSavingImage ? "Saving..." : "Save"}
              </Button>

              {imageURL && (
                <Image
                  src={imageURL}
                  alt="Thumbnail"
                  width={200}
                  height={200}
                  className="w-16 h-16"
                />
              )}

              {/* //? END: Form Field for blog thumbnail*/}
            </div>

            {/* //? Form Field for blog description*/}

            <FormField
              control={form.control}
              name="blog_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <TipTap
                      blog_description={field.name}
                      onChange={field.onChange}
                      setValue={setValue}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* //? END: Form Field for blog title*/}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      {/* //* Blog inputs starts here */}
    </main>
  );
}
