export const loadPosts = async () => {
  const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
  const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

  // usaremos Promise.all para resolver com await os fetches acima
  const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

  const postsJson = await posts.json(); // 100 posts
  const photosJson = await photos.json(); // 5000 imgs

  // 'zipping' to unite only 100 imgs to the 100 posts
  const postsAndPhotos = postsJson.map((post, index) => {
    return { ...post, cover: photosJson[index].url };
  });

  return postsAndPhotos;
};