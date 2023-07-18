export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const a = {"І":"I","і":"і","Ї":"Yi","Й":"Y","Ц":"Ts","У":"U","К":"K","Е":"E","Н":"N","Г":"H","Ш":"Sh","Щ":"Shch","З":"Z","Х":"Kh","ї":"i","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"h","ш":"sh","щ":"shch","з":"z","х":"kh","Ф":"F","Є":"Ye","В":"V","А":"A","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"Zh","Ґ":"G","ф":"f","є":"ie","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","ґ":"g","Я":"Ya","Ч":"Ch","С":"S","М":"M","И":"Y","Т":"T","Ь":"'","Б":"B","Ю":"Yu","я":"ia","ч":"ch","с":"s","м":"m","и":"y","т":"t","ь":"'","б":"b","ю":"iu"};

export function transliterate(word){
  return word.split('').map(function (char) { 
    return a[char] || char; 
  }).join("");
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('uk-UA')
}

export function formatBlogPosts(posts, {
  filterOutDrafts = true,
  filterOutFuturePosts = true,
  sortByDate = true,
  limit = undefined,
} = {}) {

  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.data;
    // filterOutDrafts if true
    if (filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    // add post to acc
    acc.push(post)

    return acc;
  }, [])

  // sortByDate or randomize
  if (sortByDate) {
    filteredPosts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
  } else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;

}