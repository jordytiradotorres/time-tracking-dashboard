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

const showCard = (item, index, value) => {
  const hours = item.timeframes[value].current;
  const lastWeek = item.timeframes[value].previous;

  const template = `
          <figure class="item__image">
            <img src=${images[index].url} alt=${images[index].title} />
          </figure>

          <div class="item__content">
            <div class="item__title">
              <h3>${item.title}</h3>
              <img src="../images/icon-ellipsis.svg" alt="ellipsis" />
            </div>

            <div class="item__date">
              <time>${hours}hrs</time>
              <p>Last Week - ${lastWeek}hrs</p>
            </div>
          </div>
    `;

  return template;
};

const initialCards = (value) => {
  return `
  <div class="dashboard__item">
    <div class="avatar">
      <img src="./images/image-jeremy.png" alt="jeremy" />
      <span>Report for</span>
      <h3>Jeremy Robson</h3>
    </div>

    <div class="report">
      <ul class="report__list">
      ${
        value === "daily"
          ? `<li>
            <a href="#" class="daily active">Daily</a>
          </li>
          <li>
            <a href="#" class="weekly">Weekly</a>
          </li>
          <li>
            <a href="#" class="monthly">Monthly</a>
          </li>`
          : ""
      }
      ${
        value === "weekly"
          ? `<li>
            <a href="#" class="daily">Daily</a>
          </li>
          <li>
            <a href="#" class="weekly active">Weekly</a>
          </li>
          <li>
            <a href="#" class="monthly">Monthly</a>
          </li>`
          : ""
      }
      ${
        value === "monthly"
          ? `<li>
            <a href="#" class="daily">Daily</a>
          </li>
          <li>
            <a href="#" class="weekly">Weekly</a>
          </li>
          <li>
            <a href="#" class="monthly active">Monthly</a>
          </li>`
          : ""
      }
      </ul>
    </div>
</div>`;
};

document.addEventListener("DOMContentLoaded", (e) => {
  let value = "weekly";

  const data = fetchData();
  data.then((result) => {
    const fragment = document.createDocumentFragment();

    result.map((item, index) => {
      const restContent = document.createElement("div");
      restContent.classList.add("item");
      restContent.innerHTML = showCard(item, index, value);

      fragment.appendChild(restContent);
    });

    containerItems.appendChild(fragment);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    const reportListValue = e.target.textContent.toLowerCase().trim();
    const fragment = document.createDocumentFragment();

    let value = e.target.classList.value;

    const data = fetchData();
    data.then((result) => {
      containerItems.innerHTML = initialCards(value);

      result.map((item, index) => {
        const restContent = document.createElement("div");
        restContent.classList.add("item");
        restContent.innerHTML = showCard(item, index, reportListValue);

        fragment.appendChild(restContent);
      });
      containerItems.appendChild(fragment);
    });
  }
});
