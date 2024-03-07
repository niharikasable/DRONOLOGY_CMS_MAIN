"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FilePlus2 } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import supabase from "@/supabase/config";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function erectdysfn() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const { data, error } = await supabase.from("blogs").select();

    if (data) {
      console.log(data);
      setBlogs(data);
    }

    if (error) {
      alert("error fetching blogs");
    }
  };

  const deleteblog = async (blog_id) => {
    const { error } = await supabase
      .from("blogs")
      .delete()
      .eq("blog_id", blog_id);
    if (error) {
      alert("error deleting data");
    } else {
      // alert("blog deleted");
      // window.location.reload();
      fetchBlogs();
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // months are zero-based
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <main className="min-h-screen p-10">
      {/* //? Header */}
      <div className="flex justify-between">
        <Button asChild variant="outline">
          <Link href="/">
            <ChevronLeft className="mr-2 h-5 w-5" />
            Home
          </Link>
        </Button>

        {/* <Button asChild>
          <Link href="/add_blog">
            Add Blog <FilePlus2 className="ml-2 h-5 w-5" />
          </Link>
        </Button> */}
      </div>
      {/* //? Header END*/}

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              {/* //? Heding */}
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Erectile Dysfunction 
              </h1>
              {/* //? Heding END*/}
              <div className="h-1 w-20 bg-purple-700 rounded"></div>
            </div>
          </div>

          <div className="flex flex-wrap -m-4">
            {/* Map here */}

            {blogs.map((blog) => (
              <div key={blog.blog_id} className="xl:w-1/4 md:w-1/2 p-4 ">
                <div className="bg-gray-200 flex flex-col justify-around p-6 min-h-96 rounded-lg">
                  {/* <div>
                    <Image
                      className="h-40 rounded w-full object-cover object-center mb-6"
                      src={blog.blog_thumbnail}
                      // src="https://dummyimage.com/720x400"
                      alt="content"
                      width={720}
                      height={400}
                    />
                    <h3 className="tracking-widest text-blue-500 text-xs font-medium title-font">
                      {formatDate(blog.created_at)}
                    </h3>
                    <h2 className="text-base text-gray-900 font-medium title-font mb-1">
                      {blog.blog_title}
                    </h2>
                  </div> */}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button>
                        {/* <Trash className="h-4 w-4" size="icon" /> */}
                        Delete Blog
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this blog from your servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteblog(blog.blog_id)}
                          className="bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}

            {/*  */}
          </div>
        </div>
      </section>
    </main>
  );
}
