let all_courses = {};
let current_courses = {};
let used_course = "python";
let filter_text = "";

fetch("http://localhost:3022/body")
.then((res) => res.json())
.then((data) => {
    all_courses = data;
    applyCourse();
})
.catch((err) => console.log(err));

let input_filter = document.querySelector("input");

input_filter.addEventListener("keyup", (e) => {
  filter_text = e.target.value;
  applyCourse();
});


let filterCourses = () => {
    let filterd_courses = [];
    filter_text = input_filter.value;
    
    current_courses.courses.forEach((course) => {
    if (course.title.toLowerCase().includes(filter_text.toLocaleLowerCase())) {
      filterd_courses.push(course);
    }
  });
  
  return filterd_courses;
};

let applyCourse = () => {
  current_courses = all_courses[used_course];
  let filterd_courses = filterCourses();
  let course_name = current_courses.title.slice(15);
  let intro=document.querySelector(".ads");
  let courses_box = document.querySelector(".courses");
  intro.children[0].textContent = current_courses["header"];
  intro.children[1].textContent = current_courses["description"];
  intro.children[2].textContent = `Explore ${course_name}`;
  courses_box.innerHTML = "";
  filterd_courses.forEach((course) => {
    let instructors = "";
    course.instructors.forEach((instructor) => {
      instructors += `${instructor.name}, `;
    });
    courses_box.innerHTML += `<div class="course">
                  <img src="${course.image}" alt="course 1 img" />
                  <h3>${course.title}</h3>
                  <h4 class="grey">${instructors.trim().slice(0, -1)}</p>
                  <h5>E£${course.price}</h3>
              </div>`;
  });
};
