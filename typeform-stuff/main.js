let surveyTitleList = [];

//get list of forms through Typeform API
const getSurveyTitleList = async function () {
  let response = await fetch("https://api.typeform.com/forms", {
    method: "get",
    headers: {
      Authorization: `Bearer tfp_7adWeiLCzemF9PVA5m4mpRRvkDxvycYY66MeGSQ6sNjv_enr3Rva8pWVc`,
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
      Authorization: `Bearer tfp_7adWeiLCzemF9PVA5m4mpRRvkDxvycYY66MeGSQ6sNjv_enr3Rva8pWVc`,
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

// get IDs of all forms that have been returned from typeform
function getAllFormIds() {
  const surveyList = myNewSurveyList.item;
  const formIdList = [];
  surveyList.forEach((item) => {
    formIdList.push(item.id);
    return formIdList;
  });

}

// response fetch url to template
let responseId = "vAEglIar";
let url = `https://api.typeform.com/forms/${responseId}/responses`;

// get responsed from Typeform APY
const getResponseleList = async function () {
  let response = await fetch(
    // "https://api.typeform.com/forms/vAEglIar/responses"
    url,
    {
      method: "get",
      headers: {
        Authorization: `Bearer tfp_7adWeiLCzemF9PVA5m4mpRRvkDxvycYY66MeGSQ6sNjv_enr3Rva8pWVc`,
      },
    }
  );
  const myData = await response.json();

  return myData;
};

let returnedResponseList = await getResponseleList();

//put together question with answer
const surveyIdToBeMatched = myNewSurveyList.item[0];
const responsesToBeMatched = returnedResponseList.items[0];

function matchResponsewithQuestions(surveyIdToBematched) {
  for (let i = 0; i < responsesToBeMatched.answers.length; i++) {
    if (
      surveyIdToBeMatched.questions.questionlist[i].id ===
      responsesToBeMatched.answers[i].field.id
    ) {
      let question = surveyIdToBeMatched.questions.questionlist[i].title;
      let answer = responsesToBeMatched.answers[i].text
      if (responsesToBeMatched.answers[i].type === 'text'){
        answer = responsesToBeMatched.answers[i].text;
      } else if (responsesToBeMatched.answers[i].type === 'email'){
        answer = responsesToBeMatched.answers[i].email;
      }
      // console.log(
      //   surveyIdToBeMatched.questions.questionlist[i].title +
      //     " :" +
      //     responsesToBeMatched.answers[i].text
      // )
      console.log(question + ' :' + answer);
    }
  }
}

matchResponsewithQuestions(surveyIdToBeMatched);

let surveyStructureToJson = responsesToBeMatched;
const jsonString = JSON.stringify(surveyStructureToJson);
console.log(jsonString);