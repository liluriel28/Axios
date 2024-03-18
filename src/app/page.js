'use client'
import Head from 'next/head';
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {

  const [posts, setPosts] = useState([]);
  const apiEndPoint = 'https://jsonplaceholder.typicode.com/posts'
  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data: res } = await axios.get(apiEndPoint);
        setPosts(res);
      }
      catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getPosts();
  },
    []
  )

  const addPost = async () => {
    const post = { title: 'New Post', body: 'new' }
    await axios.post(apiEndPoint, post);
    setPosts([post, ...posts]);
  }

  const handleUpdate = async (post) => {
    post.title = 'Updated title';
    await axios.put(apiEndPoint + '/' + post.id);
    const postClone = [...posts];
    const index = postClone.indexOf(post);
    postClone[index] = { ...post };
    setPosts(postClone);
  }

  const handleDelete = async post => {
    await axios.delete(apiEndPoint + '/' + post.id + post);
    setPosts(posts.filter(p => p.id !== post.id));
  }


  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.h2}>Hay {posts.length} publicaciones </h1>
          <button className={styles.agregar} onClick={addPost}>Agregar Post</button>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post =>
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <button className={styles.update} onClick={() => handleUpdate(post)}>Update</button>
                  </td>
                  <td>
                    <button className={styles.delete} onClick={() => handleDelete(post)}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

    </>

  );
}
