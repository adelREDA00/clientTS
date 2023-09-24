// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import {
  addNewSavedByPostId,
  removeSavedByPostId,
  selectRecentSaveds,
  selectRecentRemoveds,
} from "app/bookmarks/bookmarksSlice";
import axios from "axios";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";
import NcBookmark, { NcBookmarkProps } from "components/NcBookmark/NcBookmark";

export type BookmarkContainerProps = Omit<NcBookmarkProps, "isBookmarked"> & {
  initBookmarked: boolean;
};

const BookmarkContainer: React.FC<BookmarkContainerProps> = (props) => {
  const { postId } = props;

 

  // User id
  const { user, token } = useContext(AuthContext);


  const [data, setData] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const isMounted = useRef(true); // Use a ref to track component mount state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const key = token; // Replace with your actual authentication token
        const config = {
          headers: {
            Authorization: `Bearer ${key}`,
          },
        };

        const res = await axios.get(`https://apiblognode.onrender.com/api/users/${user._id}`, config);
        // Handle success or any additional logic
        if (isMounted.current) {
          const postsData = Array.isArray(res.data) ? res.data : [];
          setData(postsData);
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function to run when the component is unmounted
      isMounted.current = false;
    };
  }, []);



  useEffect(() => {
    // Check if the article ID is included in the bookmarkedPostIds array
    const isArticleSaved = data.postBookMark?.includes(postId); // Add a null check for data.postBookMark
    setIsSaved(isArticleSaved);
  }, [postId, data]);


  const handleClickBookmark = async () => {
  
    setIsSaved(!isSaved)

    try {
      // Make a request to the update user endpoint
      const res = await axios.put(
        `https://apiblognode.onrender.com/api/users/${user._id}`,
        {
          postBookMarkIds: postId ,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the UI to reflect the bookmark status
      console.log("Article saved:", res.data);
     
    } catch (err) {
      console.log("Error saving article:", err);
    }
  };

  return (
    <NcBookmark onClick={handleClickBookmark} isBookmarked={isSaved} {...props} />
  );
};

export default BookmarkContainer;
