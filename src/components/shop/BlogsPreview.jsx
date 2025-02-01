import React from "react";

const BlogsPreview = () => {
    const blogs = [
      {
        id: 1,
        image:
          "https://tse2.mm.bing.net/th?id=OIP.SbdHmKH0cy94KUFhLAw06gHaE8&pid=Api&P=0&h=220",
        date: "April 24, 2023",
        title: "Introduction to PCB Manufacturing",
        content:
          "Learn the basics of PCB manufacturing and how it plays a crucial role in electronics.",
      },
      {
        id: 2,
        image:
          "https://tse2.mm.bing.net/th?id=OIP.rnayB6Iqy3RiteA08sClagHaE8&pid=Api&P=0&h=220",
        date: "May 11, 2023",
        title: "Advanced Techniques in Electronics Assembly",
        content:
          "Explore advanced techniques used in the assembly of electronic components on printed circuit boards.",
      },
      {
        id: 3,
        image:
          "https://tse3.mm.bing.net/th?id=OIP.J9Fat8EcU_9metlv094QDAHaE6&pid=Api&P=0&h=220",
        date: "May 30, 2023",
        title: "Choosing the Right Materials for PCBs",
        content:
          "A guide to selecting the appropriate materials for manufacturing high-quality and reliable PCBs.",
      },
      {
        id: 4,
        image:
          "https://tse3.mm.bing.net/th?id=OIP.mS6NMBrBffEDK8ZJEQtxgwHaEK&pid=Api&P=0&h=220",
        date: "July 2, 2023",
        title: "The Impact of IoT on PCB Design",
        content:
          "Explore how the Internet of Things (IoT) is influencing the design and development of printed circuit boards.",
      },
      {
        id: 5,
        image:
          "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/posts/5.webp",
        date: "07.11.2023",
        title: "Troubleshooting Common PCB Assembly Issues",
        content:
          "Learn how to identify and troubleshoot common issues encountered during the PCB assembly process.",
      },
    ];

    return (
      <div className="container pt-3 pb-5">
        <header className="mb-4 pb-2">
          <h3 className="fw-bold text-muted">Latest Blog posts</h3>
        </header>

        <div className="row">
          {blogs.splice(0, 4).map((blog) => (
            <div key={blog.id} className="col-lg-3 col-md-6 col-sm-6 col-12">
              <article>
                <a href="#" className="img-fluid">
                  <img
                    className="rounded w-100 card-img-top"
                    src={blog.image}
                    alt={blog.title}
                    height={200}
                  />
                </a>
                <div className="mt-2 text-muted small d-block mb-1">
                  <span>
                    <i className="bi bi-calendar me-1"></i>
                    {blog.date}
                  </span>
                  <a href="#">
                    <h6 className="text-muted fw-semibold mt-2">{blog.title}</h6>
                  </a>
                  <p className="blog-body">{blog.content}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    );
};

export default BlogsPreview;
