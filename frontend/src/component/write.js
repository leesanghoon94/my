/* eslint-disable */
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import Navbar from "./navbar";
import { readOne } from "../api/read";
import { create } from "../api/create";
import { update } from "../api/update";

export default function Write({ label = "새 글 쓰기" }) {
  const params = useParams();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (params.id) {
      readOne(params.id)().then((article) => {
        setTitle(article[0].title);
        setBody(article[0].body);
      });
    }
  }, [params.id]);

  if (params.id) {
    label = "글 수정";
  }

  const changeBodyHandler = (e) => setBody(e.target.value);
  const changeTitleHandler = (e) => setTitle(e.target.value);

  const submitHandler = async () => {
    if (params.id) {
      const result = await mutate(
        `update-${params.id}`,
        update(params.id, {
          title,
          body,
          lastUpdated: new Date().toISOString(),
        })
      );

      if (result) {
        navigate("/");
      } else {
        console.log(result);
      }
    } else {
      const coverImages = ["https://picsum.photos/200/300?grayscale/1"];
      const result = await mutate(
        "create",
        create({
          // author: {
          //   name: "이상훈",
          //   picture: "https://picsum.photos/200/300?grayscale/1",
          // },
          title,
          body,
          // coverImage:
          //   coverImages[Math.floor(Math.random() * coverImages.length)],
          // lastUpdated: new Date().toISOString(),
        })
      );

      if (result) {
        navigate("/");
      } else {
        console.log(result);
      }
    }
  };

  if (!title && params.id) {
    return (
      <div className="min-h-screen">
        <Navbar>
          <Link to="/">
            <span className="text-base leading-5 font-semibold bg-gray-400/10 rounded-full py-2 px-5 flex items-center space-x-2 hover:bg-gray-400/20 dark:highlight-white/5">
              취소
            </span>
          </Link>
        </Navbar>

        <div className="grid grid-cols-1 gap-4 auto-rows-auto max-w-md mx-auto md:max-w-screen-lg px-12 py-6">
          <div className="grid">
            <div className="leading-10 text-base font-bold text-gray-500">
              {label}
            </div>
            <div className="w-full font-semibold text-2xl py-2 px-3 placeholder-item">
              ...
            </div>
          </div>
          <div className="grid">
            <div className="leading-10 text-base font-bold text-gray-500">
              본문
            </div>
            <div className="h-96 border-solid border-2 border-gray-300 text-lg py-2 px-3 rounded-xl">
              <p className="mt-3 text-gray-500 placeholder-item leading-4 w-8/12">
                ...
              </p>
              <p className="mt-3 text-gray-500 placeholder-item leading-4 w-10/12">
                ...
              </p>
              <p className="mt-3 text-gray-500 placeholder-item leading-4 w-6/12">
                ...
              </p>
            </div>
          </div>
          <div className="grid place-items-center justify-items-center">
            <button
              className="text-base text-white leading-5 font-semibold bg-indigo-600 rounded-full py-2 px-5 items-center space-x-2 hover:bg-indigo-800 disabled:bg-gray-300 dark:highlight-white/5"
              disabled
            >
              {label}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar>
        <Link to="/">
          <span className="text-base leading-5 font-semibold bg-gray-400/10 rounded-full py-2 px-5 flex items-center space-x-2 hover:bg-gray-400/20 dark:highlight-white/5">
            취소
          </span>
        </Link>
      </Navbar>

      <div className="grid grid-cols-1 gap-4 auto-rows-auto max-w-md mx-auto md:max-w-screen-lg px-12 py-6">
        <div className="grid">
          <div className="leading-10 text-base font-bold text-gray-500">
            {label}
          </div>
          <input
            type="text"
            className=" w-full border-solid border-2 border-gray-300 font-semibold text-2xl py-2 px-3 rounded-xl"
            placeholder="제목"
            defaultValue={title}
            onChange={changeTitleHandler}
          ></input>
        </div>
        <div className="grid">
          <div className="leading-10 text-base font-bold text-gray-500">
            본문
          </div>
          <textarea
            className="h-96 border-solid border-2 border-gray-300 text-lg py-2 px-3 rounded-xl"
            placeholder="새 글쓰기"
            defaultValue={body}
            onChange={changeBodyHandler}
          ></textarea>
        </div>
        <div className="grid place-items-center justify-items-center">
          <button
            disabled={title && body ? false : true}
            className="text-base text-white leading-5 font-semibold bg-indigo-600 rounded-full py-2 px-5 items-center space-x-2 hover:bg-indigo-800 disabled:bg-gray-300 dark:highlight-white/5"
            onClick={submitHandler}
          >
            {label}
          </button>
        </div>
      </div>
    </div>
  );
}
