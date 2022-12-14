let surveyTitleList = [];

//get list of forms through Typeform API
const getSurveyTitleList = async function () {
  let response = await fetch("https://api.typeform.com/forms", {
    method: "get",
    headers: {
      Authorization: `Bearer tfp_FUpkJGbtX9ybEXdzXaBErdejWx6LKie7HxAssdtQ5YD9_e5CRvUVA2mM9`,
    },
  });
  const myData = await response.json();

  return myData;
};

// save forms list to variable for further accss
let mySurveyTitleList = await getSurveyTitleList();

class Survey {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.questions = this.questions;
  }
}

class Question {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

class QuestionList {
  constructor(object) {
    this.questionlist = object;
  }
}

class SurveyList {
  constructor(object) {
    if (typeof object === "number") throw new Error("Idi nahooy");
    this.item = object;
  }
}

// create 1 new object using key and value from the mySurveyTitleList variable

const myNewList = mySurveyTitleList.items.map(
  ({ id, title }) => new Survey(id, title)
);

const myNewSurveyList = new SurveyList(myNewList);

// get questions from Typeform APY
const getSurveyQuestionleList = async function () {
  let response = await fetch("https://api.typeform.com/forms/vAEglIar", {
    method: "get",
    headers: {
      Authorization: `Bearer tfp_FUpkJGbtX9ybEXdzXaBErdejWx6LKie7HxAssdtQ5YD9_e5CRvUVA2mM9`,
    },
  });
  const myData = await response.json();

  return myData;
};

let returnedQuestionsList = await getSurveyQuestionleList();

// Process question list to extract question ID and Title
const questionFields = returnedQuestionsList.fields.map(
  ({ id, title }) => new Question(id, title)
);

// console.log(questionFields);

const questionsListProcessed = new QuestionList(questionFields);

// add questions to appropriate survey
myNewSurveyList.item.forEach((item) => {
  const { id } = item;
  const targetQuestionData = questionsListProcessed;
  if (!targetQuestionData)
    throw new Error(`Not found questionDate with ID ${id}`);
  item.questions = targetQuestionData;
});

console.log(myNewSurveyList.item[0]['questions'])

// get responsed from Typeform APY
const getResponseleList = async function () {
  let response = await fetch(
    "https://api.typeform.com/forms/vAEglIar/responses",
    {
      method: "get",
      headers: {
        Authorization: `Bearer tfp_FUpkJGbtX9ybEXdzXaBErdejWx6LKie7HxAssdtQ5YD9_e5CRvUVA2mM9`,
      },
    }
  );
  const myData = await response.json();

  return myData;
};

let returnedResponseList = await getResponseleList();

//put together question with answer

function matchResponsewithQuestions() {
  let surveyIdToBematched = myNewSurveyList.item[0][["id"]];
  for (let i = 0; i < returnedResponseList.items[0].answers; i++) {
    if (
      myNewSurveyList.item[0]["question"][["id"]] ===
      returnedResponseList.items[0].answers[0]["id"]
    ) {
      console.log(
        myNewSurveyList.item[0]["title"] +
          " " +
          returnedResponseList.items[0].answers[0]["text"]
      );
    }
  }
}

// let myArr = myNewSurveyList.item;
// console.log(myNewSurveyList.item[0][["id"]]);
// console.log(myNewSurveyList.item[0]["questions"].questionlist[0]['id']);

matchResponsewithQuestions();
// console.log(questionWithAnswer)

