const intRepo = document.getElementById("repoName")
const GIT_REPO_API = 'https://api.github.com/repos/';

const isPopularRepo = (stargazersCount, forksCount) => {
	return (stargazersCount * 1 + forksCount * 2) >= 500 ? 'Popular' : 'Not Popular'
}

async function getRepos() {
    clear();
    const url =[GIT_REPO_API,intRepo.value].join('');
    try {
         const response = await fetch(url);
         const result = await response.json()

         var isPopular = isPopularRepo(result.stargazers_count , result.forks_count );
         const anchor = {  
             avatar_url: result.owner.avatar_url,            
             author: result.owner.login,
             repoName: result.name,
             stars: result.stargazers_count,
             forks: result.forks_count,
             popular: isPopular,
             profile:result.html_url
         }
             displayUserInfo(anchor)
      } catch (error) {
        document.querySelector("#error").innerHTML = "Repositary Not Found"
      }
    }

    function clear(){
        document.querySelector("#divResult").innerHTML = "";
        document.querySelector("#error").innerHTML = "";
    }

    const displayUserInfo = function (user) {
    let html;
    html = `
    <div class="text-black-600 bg-red-300 lg:flex-row flex-col box-border  
    text-center py-7 px-2 rounded-lg shadow-black break-words mt-6 mb-12 xl:mx-20 flex bg-cover bg-blend-screen ">
        <div class='relative h-4/5 my-0 flex flex-1 items-center justify-center flex-col'>
            <img src="${user.avatar_url}" alt="" class="w-48 h-48 rounded-full border border-solid border-zinc-500 p-1">
            <div>
                <h2 class='my-1 text-xl'>${user.author}</h2>
                <p class='mb-1 mt-0'>${user.repoName}</p>
            </div>
        </div>
            
        <div class="flex-1">
            <ul class='flex h-4/5 flex-col justify-around'>
                <li class="flex items-center justify-between flex-row">
                    <span class="text-lg">Username</span>
                    <div class='text-base'>${user.author}</div>
                </li>
                <li class="flex items-center justify-between flex-row">
                    <span class="text-lg">Repo</span>
                    <div class='text-base'>${user.repoName}</div>
                </li>
                <li class="flex items-center justify-between flex-row">
                    <span class="text-lg">Stars</span>
                    <div class='text-base'>${user.stars}</div>
                </li>
                <li class="flex items-center justify-between flex-row">
                    <span class="text-lg">Forks</span>
                    <div class='text-base'>${user.forks}</div>
                </li>
                <li class="flex items-center justify-between flex-row">
                    <span class="text-lg">Popular</span>
                    <div class='text-base'>${user.popular}</div>
                </li>
                <button class='box-border relative bg-transparent text-red-600 uppercase border-2 border-solid border-red-600 self-center
                py-0.5 px-1 text-base inline-block text-center w-28 max-w-28 leading-tight cursor-pointer rounded-3xl outline-0 basis-1/5 ml-4'><a href='${user.profile}'>Profile</a></button>
            </ul>
        </div>
    </div>`;

    document
      .querySelector("#divResult")
      .insertAdjacentHTML("beforeend", html);
  };