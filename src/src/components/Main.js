import React, { useRef, useEffect } from "react";
import * as d3 from 'd3';
import * as Survey from "survey-react";
import "survey-react/modern.css";

// Survey settings
Survey.StylesManager.applyTheme("modern");
Survey.surveyStrings.savingData = "Please wait. We are validating and saving your response.";
Survey.surveyStrings.savingDataError = "That is my own text on error.";
Survey.surveyStrings.savingDataSuccess = "That is my own text on success.";
Survey.surveyStrings.saveAgainButton = "Try to save again.";

const Main = () => {
  const ref = useRef(null);

  useEffect(() => {
    d3.select('#sp_102').select('.sv-page').append('div').lower();
    // console.log('getattr: ', d3.selectAll('.sv-question').filter(d => d['name']=='featureTable'))
  });

  var jsonAllContents = {
    title:
      "Explanation strategies",
    showProgressBar: "top",
    progressBarType: "buttons",
    pages: [
      {
        name: "page0",
        navigationTitle: "Introduction",
        navigationDescription: "",
        elements: [
          {
            "type": "panel",
            "elements": [
                {
                    "type": "html",
                    "name": "introSection1",
                    "html": "<p style='font-size: 1.3rem; font-weight: 500'>In this survey, we will ask you to evaluate different explanation strategies. \
                    This survey is designed to study how different ways of explaining AI-assisted decisions (i.e., why was I denied a loan approval?) are effective in providing the rationales on a decision. \
                    The survey consists of four parts: \
                    <ul style='font-size: 1.1rem'>\
                    <li> <b>Demographic survey</b>: we will ask about basic demographic information \
                    <li> <b>Decision-making scenario</b>: we will illustrate a scenario on a AI-assisted decision-making context where you were \
                    given a decision based on your qualification listed in a table. </li>\
                    <li> <b>Explanation strategies</b>: you will read explanations on why you were given the decision in the scenario, which are written with different strategies. </li>\
                    <li> <b>Rating</b>: Given the explanations, you will evaluate how those explanations are effective in multiple perspectives.\
                    </li> \
                    </p>"
                }
            ],
            "name": "panel1"
          }
        ]
      },
      {
        name: "page1",
        navigationTitle: "Basic demographics",
        navigationDescription: "User traits",
        elements: [
          {
            "type": "panel",
            "elements": [
                {
                    "type": "html",
                    "name": "introSection1",
                    "html": "<h3 style='text-align: left'>In this section, we will ask you to evaluate explanation strategies. \
                    First, we will illustrate a scenario on a AI-assisted decision-making context where you were \
                    given a decision based on your qualification listed in a table. \
                    Second, you will read a set of explanations with different strategies reasoning why the decision was made, \
                    and evaluate how those explanations are effective in multiple perspectives.</h3>"
                }
            ],
            "name": "panel1"
          },
          {
            type: "radiogroup",
            name: "gender",
            title: "How would you describe your gender identity?",
            isRequired: false,
            hasNone: false,
            colCount: 4,
            choices: [
              "Male",
              "Female",
              "Non-binary",
              "Others or prefer not to say"
            ],
          },
          {
            type: "checkbox",
            name: "ethnicity",
            title: "What categories describd you? Select all choices that apply.",
            isRequired: false,
            hasNone: false,
            colCount: 6,
            choices: [
              "American Indian or Alaska Native Asian",
              "Black or African American Hispanic or Latino",
              "Native Hawaiian or Other Pacific Islander White",
              "Middle Eastern or North African",
              "White",
              "Some other race, ethnicity, or origin, or prefer not to say",
            ]
          },
          {
            type: "radiogroup",
            name: "education",
            title: "What is the highest degree of level of school you have completed?",
            isRequired: false,
            hasNone: true,
            colCount: 8,
            choices: [
              "No schooling completed",
              "To 8th grade",
              "Some high school, no diploma",
              "High school graduate, diploma or the equivalent (for example: GED) Some college credit, no degree",
              "Trade/technical/vocational training Associate degree",
              "Bachelor's degree",
              "Master's degree",
              "Professional degree Doctorate degree, or Prefer not to say",
            ],
          },
          {
            type: "matrix",
            name: "decisionMakingStyle",
            title:
              "How do you describe your decision-making styles?",
            columns: [
              {
                value: 1,
                text: "Strongly Disagree",
              },
              {
                value: 2,
                text: "Disagree",
              },
              {
                value: 3,
                text: "Neutral",
              },
              {
                value: 4,
                text: "Agree",
              },
              {
                value: 5,
                text: "Strongly Agree",
              },
            ],
            rows: [
              {
                value: "rational",
                text: "I explore all of my options before making a decision in a logical and systematic way.",
              },
              {
                value: "avoidant",
                text: "I avoid making important decisions until the pressure is on.",
              },
              {
                value: "dependent",
                text: "I rarely make important decisions without consulting other people.",
              },
              {
                value: "intuitive",
                text: "When I make decisions, I tend to rely on my intuition.",
              },
              {
                value: "swift",
                text: "I generally make snap decisions.",
              },
            ],
          },
        ],
      },
      {
        name: "page2",
        navigationTitle: "Scenario",
        navigationDescription: "AI-assisted decision-making",
        elements: [
          {
            "type": "panel",
            "elements": [
                {
                    "type": "html",
                    "name": "introSection2",
                    "html": "<h3 style='text-align: left'>In this section, we will ask you to evaluate explanation strategies. \
                    First, we will illustrate a scenario on a AI-assisted decision-making context where you were \
                    given a decision based on your qualification listed in a table. \
                    Second, you will read a set of explanations with different strategies reasoning why the decision was made, \
                    and evaluate how those explanations are effective in multiple perspectives.</h3>"
                }
            ],
            "name": "introSection1"
          },
          {
            "type": "panel",
            "elements": [
                {
                    "type": "html",
                    "name": "scenarioDescription",
                    "html": "<h2>Scenario</h2><h3 class='scenario' style='text-align: left'>Imagine that you applied for a loan a month ago to secure more budget for buying a house. \
                    After the screening process, however, you were notified of being rejected from getting a loan. \
                    It was an unexpected result for you because there were several cases around you who were granted \
                    a loan. You would like to know why you were denied a loan.</h3>"
                }
            ],
            "name": "panel1"
          },
          {
            type: "matrix",
            name: "featureTable",
            title: "Feature Table",
            columns: [
                "Value"
            ],
            rows: [
                {
                    value: "Delay in paying off",
                    text: "Delay in paying off"
                },
                {
                  value: "Credit score",
                  text: "Credit score"
                }, {
                    value: "Credit amount",
                    text: "Credit amount"
                }, {
                    value: "Balance in account",
                    text: "Balance in account"
                }, {
                  value: "Housing",
                  text: "Housing"
                },
                {
                  value: "Employment",
                  text: "Employment"
                },
                {
                  value: "Annual income",
                  text: "Annual income"
                },
            ],
            cells: {
                "Delay in paying off": {
                    "Value": "No"
                },
            }
          },
          {
            type: "matrix",
            name: "decisionMakingStyle",
            title:
              "How do you perceive the situation with respect to the properties listed above?",
            columns: [
              {
                value: 1,
                text: "Strongly Disagree",
              },
              {
                value: 2,
                text: "Disagree",
              },
              {
                value: 3,
                text: "Neutral",
              },
              {
                value: 4,
                text: "Agree",
              },
              {
                value: 5,
                text: "Strongly Agree",
              },
            ],
            rows: [
              {
                value: "highStakes",
                text: "High-stakes (the consequence of the decision is critical)",
              },
              {
                value: "professional",
                text: "Professional (the situation requires significant domain knowledge)",
              },
              {
                value: "timely",
                text: "Timely (the situation requires to make a swift decision)",
              },
            ],
          },
        ],
      },
      {
        name: "page3",
        navigationTitle: "Explanation strategies",
        navigationDescription: "",
        elements: [
          {
            "type": "panel",
            "elements": [
                {
                    "type": "html",
                    "name": "income_intro",
                    "html": "<h3 style='text-align: left'>Assume that an AI-assisted system \
                    provides the textual explanation upon a user's request asking the rationale \
                    behind the decision. The following choices are a set of natural language \
                    explanations with different strategies. (Read through the explanations in this page. \
                      You will evaluate these explanations in the next page)</h3>"
                }
            ],
            "name": "description"
          },
          {
            type: "matrix",
            name: "explanationStrategies",
            title: "Explanation strategies",
            columns: [
                "Explanation"
            ],
            rows: [
                {
                    value: "explanationA",
                    text: ""
                },
                {
                  value: "explanationB",
                  text: ""
                },
                {
                  value: "explanationC",
                  text: ""
                },
                {
                  value: "explanationD",
                  text: ""
                },
                {
                  value: "explanationE",
                  text: ""
                },
                {
                  value: "explanationF",
                  text: ""
                }
            ],
            cells: {
                "explanationA": {
                    "Explanation": "Your credit history indicates there was no delay in paying off in the past, your credit score is 750, which is categorized as good, and you have a credit amounting to $10,000. The existing checking account has a balance of more than $20,000. You are female and single at the age of 45. You were denied a loan because you live at a monthly rent and are unemployed and have no annual income for now."
                },
                "explanationB": {
                  "Explanation": "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
              },
                "explanationC": {
                  "Explanation": "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
              },
                "explanationD": {
                  "Explanation": "A contrastive case is that of Person A. Person A was granted a loan since she was employed with an annual income of $32,500 more than you. You have no annual income and we therefore cannot grant you a loan."
              },
                "explanationE": {
                "Explanation": "The most similar case that was denied a loan is that of Person B. Person B’s credit history indicates there was no delay in paying off loans in the past and they have a credit score of 600, which is categorized as not good, with credit amounting to $9,000. Their existing checking account has a balance of more than $20,000. Therefore, they were denied a loan. Your credit history indicates that there was a delay in paying off loans in the past and you have a credit score of 750, which is categorized as good, but you are unemployed with no annual income for now. Therefore, you have been denied a loan."
              },
                "explanationF": {
                "Explanation": "A contrastive case is that of Person A. Person A was granted a loan since she was employed with an annual income of $32,500 more than you. You have no annual income and we therefore cannot grant you a loan."
              },
                "explanationF": {
                "Explanation": "Compared to your case, the most typical (average) case B who was denied a loan, has a lower credit score by 100, which is categorized as not good, but has a credit amounting to $1,000, and is single. You have a credit score of 750, which is categorized as good, but you have credit amounting to $9,000 and are unemployed and single. Therefore, you have been denied a loan."
              },
            }
          },
        ]
      },
      {
        name: "page4",
        navigationTitle: "Evaluation",
        navigationDescription: "For explanatory values",
        elements: [
          {
            "type": "panel",
            "name": "panelExpRanking",
            "elements": [
              {
                type: "matrix",
                name: "explanationDisplay",
                title: "Explanations",
                columns: [
                  {
                    value: "Text",
                    maxWidth: '30%'
                  }
                ],
                rows: [
                  {
                    value: "explanationA",
                    text: ""
                  },
                  {
                    value: "explanationB",
                    text: ""
                  },
                  {
                    value: "explanationC",
                    text: ""
                  },
                  {
                    value: "explanationD",
                    text: ""
                  },
                  {
                    value: "explanationE",
                    text: ""
                  },
                  {
                    value: "explanationF",
                    text: ""
                  }
                ],
                cells: {
                    "explanationA": {
                        "Text": "Your credit history indicates there was no delay in paying off in the past, your credit score is 750, which is categorized as good, and you have a credit amounting to $10,000. The existing checking account has a balance of more than $20,000. You are female and single at the age of 45. You were denied a loan because you live at a monthly rent and are unemployed and have no annual income for now."
                    },
                    "explanationB": {
                      "Text": "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
                  },
                    "explanationC": {
                      "Text": "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
                  },
                    "explanationD": {
                      "Text": "A contrastive case is that of Person A. Person A was granted a loan since she was employed with an annual income of $32,500 more than you. You have no annual income and we therefore cannot grant you a loan."
                  },
                    "explanationE": {
                    "Text": "The most similar case that was denied a loan is that of Person B. Person B’s credit history indicates there was no delay in paying off loans in the past and they have a credit score of 600, which is categorized as not good, with credit amounting to $9,000. Their existing checking account has a balance of more than $20,000. Therefore, they were denied a loan. Your credit history indicates that there was a delay in paying off loans in the past and you have a credit score of 750, which is categorized as good, but you are unemployed with no annual income for now. Therefore, you have been denied a loan."
                  },
                    "explanationF": {
                    "Text": "A contrastive case is that of Person A. Person A was granted a loan since she was employed with an annual income of $32,500 more than you. You have no annual income and we therefore cannot grant you a loan."
                  },
                    "explanationF": {
                    "Text": "Compared to your case, the most typical (average) case B who was denied a loan, has a lower credit score by 100, which is categorized as not good, but has a credit amounting to $1,000, and is single. You have a credit score of 750, which is categorized as good, but you have credit amounting to $9,000 and are unemployed and single. Therefore, you have been denied a loan."
                  },
                }
              },
              // panel that wraps explanations (on the left) and ranking questions (on the right)
              {
                "type": "panel",
                "name": "panelRanking",
                "elements": [
                  {
                    "type": "ranking",
                    "name": "smartphone-features",
                    "title": "How explanation do you prefer in an overall sense? \
                    Rank the explanations based on your preferences by dragging up and down the items.",
                    "isRequired": true,
                    "choices": [
                        "Explanation A",
                        "Explanation B",
                        "Explanation C",
                        "Explanation D",
                        "Explanation E",
                        "Explanation F"
                    ]
                  },
                  {
                    "type": "ranking",
                    "name": "smartphone-features",
                    "title": "How do you evaluate the explanations the explanations to be sufficiently detailed and complete? \
                    Rank the explanations based on your preferences by dragging up and down the items.",
                    "isRequired": true,
                    "choices": [
                        "Explanation A",
                        "Explanation B",
                        "Explanation C",
                        "Explanation D",
                        "Explanation E",
                        "Explanation F"
                    ]
                  },
                  {
                    "type": "ranking",
                    "name": "smartphone-features",
                    "title": "How do you evaluate the explanations the explanations to be understandable? \
                    Rank the explanations based on your preferences by dragging up and down the items.",
                    "isRequired": true,
                    "choices": [
                        "Explanation A",
                        "Explanation B",
                        "Explanation C",
                        "Explanation D",
                        "Explanation E",
                        "Explanation F"
                    ]
                  },
                  {
                    "type": "ranking",
                    "name": "smartphone-features",
                    "title": "How do you evaluate the explanations to help you trust the decision-making process? \
                    Rank the explanations based on your preferences by dragging up and down the items.",
                    "isRequired": true,
                    "choices": [
                        "Explanation A",
                        "Explanation B",
                        "Explanation C",
                        "Explanation D",
                        "Explanation E",
                        "Explanation F"
                    ]
                  },
                  {
                    "type": "ranking",
                    "name": "smartphone-features",
                    "title": "How do you evaluate the explanations to be useful to achieve your goal? \
                    Rank the explanations based on your preferences by dragging up and down the items.",
                    "isRequired": true,
                    "choices": [
                        "Explanation A",
                        "Explanation B",
                        "Explanation C",
                        "Explanation D",
                        "Explanation E",
                        "Explanation F"
                    ]
                  },
                  {
                    "type": "ranking",
                    "name": "smartphone-features",
                    "title": "How do you evaluate the explanations to be useful to achieve your goal? \
                    Rank the explanations based on your preferences by dragging up and down the items.",
                    "isRequired": true,
                    "choices": [
                        "Explanation A",
                        "Explanation B",
                        "Explanation C",
                        "Explanation D",
                        "Explanation E",
                        "Explanation F"
                    ]
                  },
                ]
              },
              
            ],
          },
        ]
      }
    ],
  };

  var jsonFromSurveyJs = {
    surveyId: 'e873a25d-0288-4e8a-bb0b-4d1287798588',
    surveyPostId: '21c9eb9a-0641-4371-8dea-e9309c7850b8',
  }

  let survey = new Survey.Model(jsonFromSurveyJs);
  

  // survey.onComplete.add(function (sender) {
  //   console.log('select surveyResult: ', document.querySelector("#surveyResult"))
  //   document.querySelector("#surveyResult").textContent =
  //     "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
  // });

  function sendDataToServer(survey) {
    survey.sendResult('21c9eb9a-0641-4371-8dea-e9309c7850b8');
  }

  survey.surveyShowDataSaving = true;

  survey.onUpdatePanelCssClasses.add(function (survey, options, i) {
    let classes = options.cssClasses.panel;

    console.log("custom css-class added: ", options.panel.name);
    console.log("option for panel: ", options);

    if (options.panel.name == 'panelExpRanking') {
      classes.content += " displayFlex";
    }

    if (options.panel.name == 'panelRanking') {
      classes.content += " floatRight width30";
    }
    
  });

  survey.onUpdateQuestionCssClasses.add(function (survey, options, i) {
    let classes = options.cssClasses;

    console.log("custom css-class added: ", options.question.name);
    console.log("option: ", options);

    classes.mainRoot += " " + options.question.name;
    classes.mainRoot += " sv_qstn";
    classes.root = "sq-root";
    classes.title += " sq-title";
    classes.item += " sq-item";
    classes.label += " sq-label";

    if ((options.question.getType() == 'radiogroup') || (options.question.getType() == 'checkbox')) {
      classes.column += " displayBlock paddingLeft50 maxWidth40";
      classes.item += " textAlignLeft";
    }

    if (options.question.getType() == 'matrix') {
      classes.content += " width90";
      classes.cellHeader += " maxWidth50px"
      classes.cell += " minWidth10px"
      classes.headerCell += " maxWidth50px"
    }

    if (options.question.name == 'decisionMakingStyle') {
      classes.cell += " paddingLeft1";
    }

    if (options.question.name == 'scenarioDescription') {
      // classes.mainRoot += " backgroundColorLightGray";
    }

    if (options.question.name == 'explanationStrategies') {
      classes.cellText += " textAlignLeft";
    }

    if (options.question.name == 'explanationDisplay') {
      classes.mainRoot += " floatLeft width40 positionFixed";
      classes.cellText += " textAlignLeft";
    }

    // if (options.question.isRequired) {
    //   classes.title += " sq-title-required";
    //   classes.root += " sq-root-required";
    // }

    // if (options.question.getType() === "checkbox") {
    //   classes.root += " sq-root-cb";
    // }
  });

  return (
    <div className="App">
      <Survey.Survey model={survey} onComplete={sendDataToServer} ref={ref} />
    </div>
  );
}

export default Main;
