import _, { shuffle } from 'lodash';

import "./App.css";
import Main from "./components/Main";
import data from './data/data.json';


function App() {
  const expTypes = [
    'complete',
    'counterfactual',
    'contrastive_o',
    'contrastive_t',
    'case_based_homo',
    'case_based_hetero'
  ];

  let jsonAllContents = {
    title:
      "Explanation strategies",
    showProgressBar: "top",
    progressBarType: "buttons",
    pages: [
      {
        name: "page0",
        elements: [
          {
            type: "panel",
            name: "panel1",
            elements: [
              {
                type: "html",
                name: "introSection1",
                html: "<p style='font-size: 1.3rem; font-weight: 500'>In this survey, we will ask you to evaluate different explanation strategies.                     This survey is designed to study how different ways of explaining AI-assisted decisions (i.e., why was I denied a loan approval?) are effective in providing the rationales on a decision.                     The survey consists of four parts:                     <ul style='font-size: 1.1rem'>                    <li> <b>Demographic survey</b>: we will ask about basic demographic information                     <li> <b>Decision-making scenario</b>: we will illustrate a scenario on a AI-assisted decision-making context where you were                     given a decision based on your qualification listed in a table. </li>                    <li> <b>Explanation strategies</b>: you will read explanations on why you were given the decision in the scenario, which are written with different strategies. </li>                    <li> <b>Rating</b>: Given the explanations, you will evaluate how those explanations are effective in multiple perspectives.                    </li>                     </p>"
              }
            ]
          }
        ],
        navigationTitle: "Introduction"
      },
      {
        name: "page1",
        elements: [
          {
            type: "panel",
            name: "panel1",
            elements: [
              {
                type: "html",
                name: "introSection1",
                html: "<h3 style='text-align: left'>In this section, we will ask you to evaluate explanation strategies.                     First, we will illustrate a scenario on a AI-assisted decision-making context where you were                     given a decision based on your qualification listed in a table.                     Second, you will read a set of explanations with different strategies reasoning why the decision was made,                     and evaluate how those explanations are effective in multiple perspectives.</h3>"
              }
            ]
          },
          {
            type: "radiogroup",
            name: "gender",
            title: "How would you describe your gender identity?",
            isRequired: true,
            choices: [
              "Male",
              "Female",
              "Non-binary",
              "Others or prefer not to say"
            ],
            colCount: 4
          },
          {
            type: "checkbox",
            name: "ethnicity",
            title: "What categories describe you? Select all choices that apply.",
            isRequired: true,
            choices: [
              "American Indian or Alaska Native",
              "Asian",
              "Black or African American",
              "Hispanic or Latino",
              "Native Hawaiian or Other Pacific Islander",
              "Middle Eastern or North African",
              "White",
              "Some other race, ethnicity, or origin, or prefer not to say"
            ]
          },
          {
            type: "radiogroup",
            name: "education",
            title: "What is the highest degree of level of school you have completed?",
            isRequired: true,
            choices: [
              "No schooling completed",
              "To 8th grade",
              "Some high school, no diploma",
              "High school graduate, diploma or the equivalent (for example: GED) Some college credit, no degree",
              "Trade/technical/vocational training Associate degree",
              "Bachelor's degree",
              "Master's degree",
              "Professional degree Doctorate degree, or Prefer not to say"
            ],
            hasNone: true
          },
          {
            type: "matrix",
            name: "decisionMakingStyle",
            title: "How do you describe your decision-making styles?",
            isRequired: true,
            columns: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ],
            rows: [
              {
                value: "rational",
                text: "I explore all of my options before making a decision in a logical and systematic way."
              },
              {
                value: "avoidant",
                text: "I avoid making important decisions until the pressure is on."
              },
              {
                value: "dependent",
                text: "I rarely make important decisions without consulting other people."
              },
              {
                value: "intuitive",
                text: "When I make decisions, I tend to rely on my intuition."
              },
              {
                value: "swift",
                text: "I generally make snap decisions."
              }
            ]
          }
        ],
        navigationTitle: "Basic demographics",
        navigationDescription: "User traits"
      },
      {
        name: "page2",
        elements: [
          {
            type: "panel",
            name: "introSection1",
            elements: [
              {
                type: "html",
                name: "introSection2",
                html: "<h3 style='text-align: left'>In this section, we will ask you to evaluate explanation strategies.                     First, we will illustrate a scenario on a AI-assisted decision-making context where you were                     given a decision based on your qualification listed in a table.                     Second, you will read a set of explanations with different strategies reasoning why the decision was made,                     and evaluate how those explanations are effective in multiple perspectives.</h3>"
              }
            ]
          },
          {
            type: "panel",
            name: "panel1",
            elements: [
              {
                type: "html",
                name: "scenarioDescription",
                html: "<h2>Scenario</h2><h3 class='scenario' style='text-align: left'>Imagine that you applied for a loan a month ago to secure more budget for buying a house.                     After the screening process, however, you were notified of being rejected from getting a loan.                     It was an unexpected result for you because there were several cases around you who were granted                     a loan. You would like to know why you were denied a loan.</h3>"
              }
            ]
          },
          {
            type: "matrix",
            name: "featureTable",
            title: "The table below shows your status and information that were used in the AI-based decision-making in the given scenario.",
            columns: [
              {
                value: "Value",
                text: " "
              },
            ],
            rows: [
              
            ],
            cells: {
            }
          },
          {
            type: "matrix",
            name: "decisionMakingStyle",
            title: "How do you perceive the given situation with respect to the properties listed above?",
            isRequired: true,
            columns: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ],
            rows: [
              {
                value: "highStakes",
                text: "High-stakes (the consequence of the decision is critical)"
              },
              {
                value: "professional",
                text: "Professional (the situation requires significant domain knowledge)"
              },
              {
                value: "timely",
                text: "Timely (the situation requires to make a swift decision)"
              }
            ]
          },
          {
            type: "matrix",
            name: "question1",
            title: "How do you perceive yourself with respect to the following statement?",
            isRequired: true,
            columns: [
              {
                value: 1,
                text: "Strongly Disagree"
              },
              {
                value: 2,
                text: "Disagree"
              },
              {
                value: 3,
                text: "Neutral"
              },
              {
                value: 4,
                text: "Agree"
              },
              {
                value: 5,
                text: "Strongly Agree"
              }
            ],
            rows: [
              {
                value: "motivation",
                text: "I feel I need to think and investigate why this decision was made by the AI system."
              },
              {
                value: "opportunity",
                text: "The given contexts and constraints allow me to think and investigate why this decision was made by the AI system."
              },
              {
                value: "ability",
                text: "I have the required knowledge to understand the information in your status used in the decision-making."
              }
            ]
          }
        ],
        navigationTitle: "Scenario",
        navigationDescription: "AI-assisted decision"
      },
      {
        name: "page3",
        elements: [
          {
            type: "panel",
            name: "description",
            elements: [
              {
                type: "html",
                name: "income_intro",
                html: "<h3 style='text-align: left'>Assume that an AI-assisted system                     provides the textual explanation upon a user's request asking the rationale                     behind the decision. The following choices are a set of natural language                     explanations with different strategies. (Read through the explanations in this page.                       You will evaluate these explanations in the next page)</h3>"
              }
            ]
          },
          {
            type: "matrix",
            name: "explanationStrategies",
            title: "Explanation strategies",
            columns: [
              "Explanation"
            ],
            rows: [
              "explanation A",
              "explanation B",
              "explanation C",
              "explanation D",
              "explanation E",
              "explanation F"
            ],
            cells: {
              "explanation A": {
                Explanation: "Your credit history indicates there was no delay in paying off in the past, your credit score is 750, which is categorized as good, and you have a credit amounting to $10,000. The existing checking account has a balance of more than $20,000. You are female and single at the age of 45. You were denied a loan because you live at a monthly rent and are unemployed and have no annual income for now."
              },
              "explanation B": {
                Explanation: "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
              },
              "explanation C": {
                Explanation: "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
              },
              "explanation D": {
                Explanation: "A contrastive case is that of Person A. Person A was granted a loan since she was employed with an annual income of $32,500 more than you. You have no annual income and we therefore cannot grant you a loan."
              },
              "explanation E": {
                Explanation: "The most similar case that was denied a loan is that of Person B. Person B’s credit history indicates there was no delay in paying off loans in the past and they have a credit score of 600, which is categorized as not good, with credit amounting to $9,000. Their existing checking account has a balance of more than $20,000. Therefore, they were denied a loan. Your credit history indicates that there was a delay in paying off loans in the past and you have a credit score of 750, which is categorized as good, but you are unemployed with no annual income for now. Therefore, you have been denied a loan."
              },
              "explanation F": {
                Explanation: "Compared to your case, the most typical (average) case B who was denied a loan, has a lower credit score by 100, which is categorized as not good, but has a credit amounting to $1,000, and is single. You have a credit score of 750, which is categorized as good, but you have credit amounting to $9,000 and are unemployed and single. Therefore, you have been denied a loan."
              }
            }
          },
          {
            type: "panel",
            name: "panel2",
            title: "After reading the scenario, given"
          }
        ],
        navigationTitle: "Explanation strategies"
      },
      {
        name: "page4",
        elements: [
          {
            type: "panel",
            name: "panelExpRanking1",
            elements: [
              {
                type: "matrix",
                name: "explanationDisplay1",
                title: "Given these explanations, please rank them based on your preferences regarding the questions by dragging up and down the items.",
                columns: [
                  {
                    value: "Explanation",
                    maxWidth: '30%'
                  }
                ],
                rows: [
                  {
                    value: "explanation A",
                    text: ""
                  },
                  {
                    value: "explanation B",
                    text: ""
                  },
                  {
                    value: "explanation C",
                    text: ""
                  },
                  {
                    value: "explanation D",
                    text: ""
                  },
                  {
                    value: "explanation E",
                    text: ""
                  },
                  {
                    value: "explanation F",
                    text: ""
                  }
                ],
                cells: {
                  "explanation A": {
                    Explanation: "Your credit history indicates there was no delay in paying off in the past, your credit score is 750, which is categorized as good, and you have a credit amounting to $10,000. The existing checking account has a balance of more than $20,000. You are female and single at the age of 45. You were denied a loan because you live at a monthly rent and are unemployed and have no annual income for now."
                  },
                  "explanation B": {
                    Explanation: "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
                  },
                  "explanation C": {
                    Explanation: "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
                  },
                  "explanation D": {
                    Explanation: "A contrastive case is that of Person A. Person A was granted a loan since she was employed with an annual income of $32,500 more than you. You have no annual income and we therefore cannot grant you a loan."
                  },
                  "explanation E": {
                    Explanation: "The most similar case that was denied a loan is that of Person B. Person B’s credit history indicates there was no delay in paying off loans in the past and they have a credit score of 600, which is categorized as not good, with credit amounting to $9,000. Their existing checking account has a balance of more than $20,000. Therefore, they were denied a loan. Your credit history indicates that there was a delay in paying off loans in the past and you have a credit score of 750, which is categorized as good, but you are unemployed with no annual income for now. Therefore, you have been denied a loan."
                  },
                  "explanation F": {
                    Explanation: "Compared to your case, the most typical (average) case B who was denied a loan, has a lower credit score by 100, which is categorized as not good, but has a credit amounting to $1,000, and is single. You have a credit score of 750, which is categorized as good, but you have credit amounting to $9,000 and are unemployed and single. Therefore, you have been denied a loan."
                  }
                }
              },
              {
                type: "panel",
                name: "panelRanking1",
                elements: [
                  {
                    type: "ranking",
                    name: "question2",
                    title: "How much difficult is it for you to distinguish important and unimportant information for your decision-making from these explanations?",
                    isRequired: true,
                    choices: [
                      {
                        value: "item1",
                        text: "Explanation A"
                      },
                      {
                        value: "item2",
                        text: "Explanation B"
                      },
                      {
                        value: "item3",
                        text: "Explanation C"
                      },
                      {
                        value: "item4",
                        text: "Explanation D"
                      },
                      {
                        value: "item5",
                        text: "Explanation E"
                      },
                      {
                        value: "item6",
                        text: "Explanation F"
                      }
                    ]
                  },
                  {
                    type: "ranking",
                    name: "question3",
                    title: "How much confident you feel that you get the rationale on why the decision was made with these explanations?",
                    isRequired: true,
                    choices: [
                      {
                        value: "item1",
                        text: "Explanation A"
                      },
                      {
                        value: "item2",
                        text: "Explanation B"
                      },
                      {
                        value: "item3",
                        text: "Explanation C"
                      },
                      {
                        value: "item4",
                        text: "Explanation D"
                      },
                      {
                        value: "item5",
                        text: "Explanation E"
                      },
                      {
                        value: "item6",
                        text: "Explanation F"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        navigationTitle: "Evaluation",
        navigationDescription: "Cognition"
      },
      {
        name: "page5",
        elements: [
          {
            type: "panel",
            name: "panelExpRanking2",
            elements: [
              {
                type: "matrix",
                name: "explanationDisplay2",
                title: "Given these explanations, please rank them based on your preferences regarding the questions by dragging up and down the items.",
                columns: [
                  "Explanation"
                ],
                rows: [
                  "explanation A",
                  "explanation B",
                  "explanation C",
                  "explanation D",
                  "explanation E",
                  "explanation F"
                ],
                cells: {
                  "explanation A": {
                    Explanation: "Your credit history indicates there was no delay in paying off in the past, your credit score is 750, which is categorized as good, and you have a credit amounting to $10,000. The existing checking account has a balance of more than $20,000. You are female and single at the age of 45. You were denied a loan because you live at a monthly rent and are unemployed and have no annual income for now."
                  },
                  "explanation B": {
                    Explanation: "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
                  },
                  "explanation C": {
                    Explanation: "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
                  },
                  "explanation D": {
                    Explanation: "A contrastive case is that of Person A. Person A was granted a loan since she was employed with an annual income of $32,500 more than you. You have no annual income and we therefore cannot grant you a loan."
                  },
                  "explanation E": {
                    Explanation: "The most similar case that was denied a loan is that of Person B. Person B’s credit history indicates there was no delay in paying off loans in the past and they have a credit score of 600, which is categorized as not good, with credit amounting to $9,000. Their existing checking account has a balance of more than $20,000. Therefore, they were denied a loan. Your credit history indicates that there was a delay in paying off loans in the past and you have a credit score of 750, which is categorized as good, but you are unemployed with no annual income for now. Therefore, you have been denied a loan."
                  },
                  "explanation F": {
                    Explanation: "Compared to your case, the most typical (average) case B who was denied a loan, has a lower credit score by 100, which is categorized as not good, but has a credit amounting to $1,000, and is single. You have a credit score of 750, which is categorized as good, but you have credit amounting to $9,000 and are unemployed and single. Therefore, you have been denied a loan."
                  }
                }
              },
              {
                type: "panel",
                name: "panelRanking2",
                elements: [
                  {
                    type: "ranking",
                    name: "overallPreference",
                    title: "How explanation do you prefer in an overall sense?                     Rank the explanations based on your preferences by dragging up and down the items.",
                    isRequired: true,
                    choices: [
                      "Explanation A",
                      "Explanation B",
                      "Explanation C",
                      "Explanation D",
                      "Explanation E",
                      "Explanation F"
                    ]
                  },
                  {
                    type: "comment",
                    name: "preferenceOpinion",
                    title: "Please briefly describe the rationale on ranking the explanations."
                  },
                  {
                    type: "ranking",
                    name: "sufficientlyDetailedAndComplete",
                    title: "How do you evaluate the explanations to be sufficiently detailed and complete?                     Rank the explanations based on your preferences by dragging up and down the items.",
                    isRequired: true,
                    choices: [
                      "Explanation A",
                      "Explanation B",
                      "Explanation C",
                      "Explanation D",
                      "Explanation E",
                      "Explanation F"
                    ]
                  },
                  {
                    type: "ranking",
                    name: "understandable",
                    title: "How do you evaluate the explanations to be understandable?                     Rank the explanations based on your preferences by dragging up and down the items.",
                    isRequired: true,
                    choices: [
                      "Explanation A",
                      "Explanation B",
                      "Explanation C",
                      "Explanation D",
                      "Explanation E",
                      "Explanation F"
                    ]
                  },
                  {
                    type: "ranking",
                    name: "helpful",
                    title: "How do you evaluate the explanations to help you trust the decision-making process?                     Rank the explanations based on your preferences by dragging up and down the items.",
                    isRequired: true,
                    choices: [
                      "Explanation A",
                      "Explanation B",
                      "Explanation C",
                      "Explanation D",
                      "Explanation E",
                      "Explanation F"
                    ]
                  },
                  {
                    type: "ranking",
                    name: "useful",
                    title: "How do you evaluate the explanations to be useful to achieve your goal?                     Rank the explanations based on your preferences by dragging up and down the items.",
                    isRequired: true,
                    choices: [
                      "Explanation A",
                      "Explanation B",
                      "Explanation C",
                      "Explanation D",
                      "Explanation E",
                      "Explanation F"
                    ]
                  },
                  {
                    type: "ranking",
                    name: "useful",
                    title: "How do you evaluate the explanations to be useful to achieve your goal?                     Rank the explanations based on your preferences by dragging up and down the items.",
                    isRequired: true,
                    choices: [
                      "Explanation A",
                      "Explanation B",
                      "Explanation C",
                      "Explanation D",
                      "Explanation E",
                      "Explanation F"
                    ]
                  }
                ]
              }
            ]
          }
        ],
        navigationTitle: "Evaluation",
        navigationDescription: "Explanatory values"
      }
    ]
  };

  const setting = {
    context: 'loan',
    decision: 'negative',
    agent: 'human',
  }

  const jsonFromSurveyJs = {
    surveyId: 'e873a25d-0288-4e8a-bb0b-4d1287798588',
    surveyPostId: '21c9eb9a-0641-4371-8dea-e9309c7850b8',
  }

  const questionsToUpdate = [
    { pIdx: 3, qIdx: 1, inPanel: false, pName: 'page3', qName: 'explanationStrategies' },
    { pIdx: 4, qIdx: 0, inPanel: true, pName: 'page4', qName: 'explanationDisplay' },
    { pIdx: 5, qIdx: 0, inPanel: true, pName: 'page5', qName: 'explanationDisplay' }
  ];

  let dataForContext = {};
  let shuffledEs = [];
  let updatedJsonAllContents = {};
  
  // For explanation matrix cells
  const updateEs = (questionsToUpdate, shuffledEs, jsonAllContents) => {
    questionsToUpdate.forEach(q => {
      let currP = '';
  
      (q.inPanel == true ) 
        ? currP = jsonAllContents.pages[q.pIdx].elements[q.qIdx].elements[0]
        : currP = jsonAllContents.pages[q.pIdx].elements[q.qIdx];
      
        return assignRandomEsForMatrix(currP, shuffledEs);
    });
  
    return jsonAllContents;
  }

  const updateFeatures = (dataForContext, jsonAllContents) => {
    const features = dataForContext.features;
    features.forEach((f, i) => {
      // Locate 'featureTable' component and push items
      jsonAllContents.pages[2].elements[2].rows.push({
        value: f.feature,
        text: f.feature
      });

      jsonAllContents.pages[2].elements[2].cells[f.feature] = { Value: f.value };
    });

    return jsonAllContents;
  }

  const updateScenario = (dataForContext, jsonAllContents) => {
    const scenario = dataForContext.description;
    const htmlText = `<h2>Scenario</h2><h3 class='scenario' style='text-align: left'>${scenario}</h3>`

    jsonAllContents.pages[2].elements[1].elements[0].html = htmlText;
    return jsonAllContents;
  }
  
  const assignRandomEsForMatrix = (q, shuffledEs) => {
    console.log('qq in random: ', q);
    ['A', 'B', 'C', 'D', 'E', 'F'].map((idx, i) => {
      q.cells['explanation ' + idx]['Explanation'] = shuffledEs[i].exp;
    })
    
    return q;
  }
  
  const getExplanations = (dataForContext) => {
    const shuffledEIdx = _.shuffle(_.range(expTypes.length));
    console.log('shuffledEIdx: ', shuffledEIdx)
    console.log('dataForContext: ', dataForContext)

    return shuffledEIdx.map(shuffledIdx => ({
      name: expTypes[shuffledIdx], 
      idx: shuffledIdx,
      exp: dataForContext.explanations[expTypes[shuffledIdx]]
    }));
  }

  if (data.length > 0) {
    dataForContext = _.filter(data, {'context': setting.context})[0];
    console.log('allExplanations: ', data)
    shuffledEs = getExplanations(dataForContext);  
  }
  
  if (shuffledEs.length > 0) {
    updatedJsonAllContents = updateEs(questionsToUpdate, shuffledEs, jsonAllContents);
    updatedJsonAllContents = updateFeatures(dataForContext, updatedJsonAllContents);
    updatedJsonAllContents = updateScenario(dataForContext, updatedJsonAllContents);
    return (
      <div className="App">
        <Main 
          contents={updatedJsonAllContents}
          contentsFromSurveyJs={jsonFromSurveyJs}
          shuffledEs={shuffledEs}
        />
      </div>
    );
  }
  else
      return (<div></div>)
}

export default App;
