"use client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddService() {
  const router = useRouter();
  const [imageURL, setImageURL] = useState("");
  const [isSavingImage, setIsSavingImage] = useState(false);

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      service_heading: "",
      service_subheading: "",
      services_thumbnail: "",
      service_description: "",
    },
  });

  const { watch, setValue } = form;

  const values = watch();

  const insertService = async () => {
    const { error } = await supabase.from("services").insert(values);

    if (error) {
      alert("error uploading service");
    } else {
      alert("Service uploaded");
      router.push("/services");
    }
  };

  const saveImage = async (e) => {
    e.preventDefault();
    setIsSavingImage(true);
    // Assuming service_thumbnail is a valid URL
    setImageURL(values.services_thumbnail);
    setIsSavingImage(false);
  };

  const onSubmit = (data) => {
    // Log the form data to the console
    console.log("Form submitted with data:", data);
    insertService();
    console.log(values);
  };

  return (
    <main className="min-h-screen p-10">
      <Button asChild variant="outline">
        <Link href="/services">
          <ChevronLeft className="mr-1 h-5 w-5" />
          All Services
        </Link>
      </Button>

      <h1 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
        Add Service
      </h1>

      <div className="mt-12">
        {/* //* For main heading*/}
        <Form {...form}>
          <form
            className="flex flex-col gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex justify-start gap-10">
              <FormField
                control={form.control}
                name="service_heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Heading</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter service heading here..."
                        className="font-medium text-lg p-6 w-96"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="services_thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service thumbnail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter image URL here..."
                        className="font-medium text-lg p-6"
                        value={values.services_thumbnail}
                        onChange={(e) =>
                          setValue("services_thumbnail", e.target.value)
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
            </div>

            <FormField
              control={form.control}
              name="service_subheading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Subheading</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter service subheading here..."
                      className="font-medium text-lg p-6 w-96"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter service description here..."
                      className="font-medium text-lg p-6 w-96"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
