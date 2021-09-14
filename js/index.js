const containerItems = document.querySelector(".gutter");

const images = [
  {
    url: "../images/icon-work.svg",
    title: "Work",
  },
  {
    url: "../images/icon-play.svg",
    title: "Play",
  },
  {
    url: "../images/icon-study.svg",
    title: "Study",
  },
  {
    url: "../images/icon-exercise.svg",
    title: "Exercise",
  },
  {
    url: "../images/icon-social.svg",
    title: "Social",
  },
  {
    url: "../images/icon-self-care.svg",
    title: "Self Care",
  },
];

const fetchData = async () => {
  try {
    const response = await fetch("../data.json");
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const data = fetchData();
data.then((result) => {
  console.log(result);
  result.map((item, index) => {
    const template = `
        <div class="item">
          <figure class="item__image">
            <img src=${images[index].url} alt=${images[index].title} />
          </figure>

          <div class="item__content">
            <div class="item__title">
              <h3>${item.title}</h3>
              <img src="../images/icon-ellipsis.svg" alt="ellipsis" />
            </div>

            <div class="item__date">
              <time>${item.timeframes.weekly.current}hrs</time>
              <p>Last Week - ${item.timeframes.weekly.previous}hrs</p>
            </div>
          </div>
        </div>
    `;

    containerItems.insertAdjacentHTML("beforeend", template);
  });
});
