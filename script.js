
fetch("http://localhost:3022/body")
.then((res) => res.json())
.then((data) => {
  all_courses = data;
  UpdateCourses();
})
.catch((err) => console.log(err));

let search_input = document.querySelector("input");

search_input.addEventListener("keyup", (e) => {
  search_text = e.target.value;
  UpdateCourses();
});


let filterCourses = () => {
  let filterd_courses = [];
  search_text = search_input.value;
  
  current_courses.courses.forEach((course) => {
    if (course.title.toLowerCase().includes(search_text.toLocaleLowerCase())) {
      filterd_courses.push(course);
    }
  });
  
  return filterd_courses;
};

let UpdateCourses = () => {
  current_courses = all_courses[used_course];
  let filterd_courses = filterCourses();
  let course_name = current_courses.title.slice(15);
  let intro=document.querySelector(".ads");
  let courses_menu = document.querySelector(".courses");
  intro.children[0].textContent = current_courses["header"];
  intro.children[1].textContent = current_courses["description"];
  intro.children[2].textContent = `Explore ${course_name}`;
  courses_menu.innerHTML = "";
  filterd_courses.forEach((course) => {
    let instructors = "";
    course.instructors.forEach((instructor) => {
      instructors += `${instructor.name}, `;
    });
    courses_menu.innerHTML += `<div class="course">
    <img src="${course.image}" alt="course 1 img" />
    <h3>${course.title}</h3>
    <h4 class="grey">${instructors.trim().slice(0, -1)}</p>
    <h5>E£${course.price}</h3>
    </div>`;
  });
};

let all_courses = {};
let current_courses = {};
let used_course = "python";
let search_text = "";