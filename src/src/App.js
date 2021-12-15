import _, { shuffle } from 'lodash';

import "./App.css";
import Main from "./components/Main";
import data from './data/data.json';


function App() {
  const setting = {
    context: 'loan',
    decision: 'negative',
    agent: 'human',
  }

  const expTypes = [
    'complete',
    'counterfactual',
    'contrastive_o',
    'contrastive_t',
    'case_based_homo',
    'case_based_hetero'
  ];

  const getAllContents = (dataForContext) => {
    return {
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
                  html: `<p style='font-size: 1.3rem; font-weight: 500;'>In this survey, we will ask you to evaluate different explanation strategies. This survey is designed to study how different ways of explaining AI-assisted decisions (i.e., ${dataForContext.decisionQuestion}) are effective in providing the rationales on a decision.                     The survey consists of four parts:                     <ul style='font-size: 1.1rem'>                    <li> <b>Demographic survey</b>: we will ask about basic demographic information                     <li> <b>Decision-making scenario</b>: we will illustrate a scenario on an AI-assisted decision-making context where you were given a decision based on your qualifications listed in a table. </li>                    <li> <b>Explanation strategies</b>: you will read explanations on why you were given the decision in the scenario, which are written with different strategies. </li><li> <b>Rating</b>: Given the explanations, you will evaluate how those explanations are effective in multiple perspectives. </li></p>`
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
                  html: "<h3 style='text-align: left'>In this section, we will ask you basic demographic information about gender, ethnicity, education, and decision-making style.</h3>"
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
                "Doctorate degree",
                "Professional degree",
                "Prefer not to say"
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
                  html: "<h3 style='text-align: left'>In this section, we will ask you to vividly imagine a decision-making situation. We will 1) illustrate a scenario on a AI-assisted decision-making context where you were given a decision and 2) list your status on which the decision was made by the AI system. Please answer the following questions based on your perception of the given scenario and the state of your thinking process.</h3>"
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
              name: "situationProperty",
              title: "How do you perceive the given situation and decision regarding the properties listed below?",
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
                  text: "High-stakes (I think the consequence of the decision in the situation is critical)"
                },
                {
                  value: "professional",
                  text: "Professional (I think the situation requires significant domain knowledge to understand it)"
                },
                {
                  value: "timely",
                  text: "Timely (I think the situation is timely such that it only allows me a brief time to reflect the decision)"
                }
              ]
            },
            {
              type: "matrix",
              name: "attribution",
              title: "Given the situation where you are being provided an AI-assisted decision, rate the following statements.",
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
                  text: `I feel it is necessary for me to deliberately think and investigate ${dataForContext.decisionText}.`
                },
                {
                  value: "opportunity",
                  text: `I feel I have enough time and resources to deliberately think and investigate ${dataForContext.decisionText}.`
                },
                {
                  value: "ability",
                  text: "I feel I have the required domain knowledge to understand the information regarding my status used in this decision."
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
                  html: "<h3 style='text-align: left'>Assume that the system explained the rationale behind the decision upon your request. The following choices are a set of possible types of explanations (Please read through the explanations. You will evaluate them in the next pages.)</h3>"
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
                "A",
                "B",
                "C",
                "D",
                "E",
                "F"
              ],
              cells: {
                "A": {
                  Explanation: "Your credit history indicates there was no delay in paying off in the past, your credit score is 750, which is categorized as good, and you have a credit amounting to $10,000. The existing checking account has a balance of more than $20,000. You are female and single at the age of 45. You were denied a loan because you live at a monthly rent and are unemployed and have no annual income for now."
                },
                "B": {
                  Explanation: "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
                },
                "C": {
                  Explanation: "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
                },
                "D": {
                  Explanation: "A contrastive case is that of Person A. Person A was granted a loan since she was employed with an annual income of $32,500 more than you. You have no annual income and we therefore cannot grant you a loan."
                },
                "E": {
                  Explanation: "The most similar case that was denied a loan is that of Person B. Person B’s credit history indicates there was no delay in paying off loans in the past and they have a credit score of 600, which is categorized as not good, with credit amounting to $9,000. Their existing checking account has a balance of more than $20,000. Therefore, they were denied a loan. Your credit history indicates that there was a delay in paying off loans in the past and you have a credit score of 750, which is categorized as good, but you are unemployed with no annual income for now. Therefore, you have been denied a loan."
                },
                "F": {
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
              name: "introSection1",
              elements: [
                {
                  type: "html",
                  name: "introRankingCogOverload",
                  html: "<h3 style='text-align: left'>Given these explanations, please rank them based on your preferences regarding the questions by dragging up and down the items.</h3>"
                }
              ]
            },
            {
              type: "panel",
              name: "panelExpRanking1",
              elements: [
                {
                  type: "matrix",
                  name: "explanationDisplay1",
                  title: "Explanation strategies",
                  columns: [
                    {
                      value: "Explanation",
                      maxWidth: '30%'
                    }
                  ],
                  rows: [
                    {
                      value: "A",
                      text: ""
                    },
                    {
                      value: "B",
                      text: ""
                    },
                    {
                      value: "C",
                      text: ""
                    },
                    {
                      value: "D",
                      text: ""
                    },
                    {
                      value: "E",
                      text: ""
                    },
                    {
                      value: "F",
                      text: ""
                    }
                  ],
                  cells: {
                    "A": {
                      Explanation: "Your credit history indicates there was no delay in paying off in the past, your credit score is 750, which is categorized as good, and you have a credit amounting to $10,000. The existing checking account has a balance of more than $20,000. You are female and single at the age of 45. You were denied a loan because you live at a monthly rent and are unemployed and have no annual income for now."
                    },
                    "B": {
                      Explanation: "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
                    },
                    "C": {
                      Explanation: "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
                    },
                    "D": {
                      Explanation: "A contrastive case is that of Person A. Person A was granted a loan since she was employed with an annual income of $32,500 more than you. You have no annual income and we therefore cannot grant you a loan."
                    },
                    "E": {
                      Explanation: "The most similar case that was denied a loan is that of Person B. Person B’s credit history indicates there was no delay in paying off loans in the past and they have a credit score of 600, which is categorized as not good, with credit amounting to $9,000. Their existing checking account has a balance of more than $20,000. Therefore, they were denied a loan. Your credit history indicates that there was a delay in paying off loans in the past and you have a credit score of 750, which is categorized as good, but you are unemployed with no annual income for now. Therefore, you have been denied a loan."
                    },
                    "F": {
                      Explanation: "Compared to your case, the most typical (average) case B who was denied a loan, has a lower credit score by 100, which is categorized as not good, but has a credit amounting to $1,000, and is single. You have a credit score of 750, which is categorized as good, but you have credit amounting to $9,000 and are unemployed and single. Therefore, you have been denied a loan."
                    }
                  }
                },
                {
                  type: "panel",
                  name: "panelRanking1",
                  elements: [
                    {
                      type: "rating",
                      name: "question1",
                      title: "How difficult is the information covered in the explanations overall for you to understand? (Rank them in order from most to least difficult)",
                      isRequired: true,
                      minRateDescription: "",
                      maxRateDescription: ""
                    },
                    {
                      type: "ranking",
                      name: "question2",
                      title: "How difficult is each For you to distinguish important and unimportant information for your decision-making from these explanations? (Rank them in order from most to least difficult, by dragging up and down the items)",
                      isRequired: true,
                      choices: [
                        {
                          value: "A",
                          text: "A"
                        },
                        {
                          value: "B",
                          text: "B"
                        },
                        {
                          value: "C",
                          text: "C"
                        },
                        {
                          value: "D",
                          text: "D"
                        },
                        {
                          value: "E",
                          text: "E"
                        },
                        {
                          value: "F",
                          text: "F"
                        }
                      ]
                    },
                    {
                      type: "ranking",
                      name: "question3",
                      title: "How did each Enhance your understanding of why you were given the decision? (Rank the explanations in order from most to least beneficial)",
                      isRequired: true,
                      choices: [
                        {
                          value: "A",
                          text: "A"
                        },
                        {
                          value: "B",
                          text: "B"
                        },
                        {
                          value: "C",
                          text: "C"
                        },
                        {
                          value: "D",
                          text: "D"
                        },
                        {
                          value: "E",
                          text: "E"
                        },
                        {
                          value: "F",
                          text: "F"
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
                  title: "Given these explanations, please rank them regarding the questions on the right.",
                  columns: [
                    "Explanation"
                  ],
                  rows: [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F"
                  ],
                  cells: {
                    "A": {
                      Explanation: "Your credit history indicates there was no delay in paying off in the past, your credit score is 750, which is categorized as good, and you have a credit amounting to $10,000. The existing checking account has a balance of more than $20,000. You are female and single at the age of 45. You were denied a loan because you live at a monthly rent and are unemployed and have no annual income for now."
                    },
                    "B": {
                      Explanation: "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
                    },
                    "C": {
                      Explanation: "You could have been granted a loan if you had been employed with an annual income more than $40,000. You have no annual income and were therefore denied a loan."
                    },
                    "D": {
                      Explanation: "A contrastive case is that of Person A. Person A was granted a loan since she was employed with an annual income of $32,500 more than you. You have no annual income and we therefore cannot grant you a loan."
                    },
                    "E": {
                      Explanation: "The most similar case that was denied a loan is that of Person B. Person B’s credit history indicates there was no delay in paying off loans in the past and they have a credit score of 600, which is categorized as not good, with credit amounting to $9,000. Their existing checking account has a balance of more than $20,000. Therefore, they were denied a loan. Your credit history indicates that there was a delay in paying off loans in the past and you have a credit score of 750, which is categorized as good, but you are unemployed with no annual income for now. Therefore, you have been denied a loan."
                    },
                    "F": {
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
                      title: "Which explanation do you prefer in an overall sense? (Rank the explanations based on your preferences)",
                      isRequired: true,
                      choices: [
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F"
                      ]
                    },
                    {
                      type: "comment",
                      name: "preferenceOpinion",
                      title: "Please briefly describe the rationale on ranking the explanations."
                    },
                    {
                      type: "html",
                      name: "introRankingExplanatoryValues",
                      html: "<h3 style='text-align: left; color: blue'>Given the explanations, please rank the following statements with first being MOST and last being LEAST.</h3>"
                    },
                    {
                      type: "ranking",
                      name: "sufficientlyDetailedAndComplete",
                      title: "The explanation is sufficiently detailed and complete.",
                      isRequired: true,
                      choices: [
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F"
                      ]
                    },
                    {
                      type: "ranking",
                      name: "understandable",
                      title: "The explanation gives me a better understanding of why I was given the decision.",
                      isRequired: true,
                      choices: [
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F"
                      ]
                    },
                    {
                      type: "ranking",
                      name: "trust",
                      title: "The explanation lets me trust the decision and how the system works.",
                      isRequired: true,
                      choices: [
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F"
                      ]
                    },
                    {
                      type: "ranking",
                      name: "useful",
                      title: "​​The explanation is actionable, that is, it helps me know what further actions or decisions I can make.",
                      isRequired: true,
                      choices: [
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F"
                      ]
                    },
                    {
                      type: "html",
                      name: "introRankingExplanatoryValues",
                      html: "<h3 style='text-align: left'>--- Post-survey questionnaire (optional)</h3>"
                    },
                    {
                      type: "comment",
                      name: "feedback",
                      title: "Do you have any feedback on questions, structure or others on the survey? if so, how can we improve it? (We appreciate for helping us improve the design of the survey)",
                      isRequired: true
                    },
                    {
                      type: "comment",
                      name: "courseInfoForPilot",
                      isRequired: true,
                      title: "How did you hear about this survey? (course/project/affiliation) (Type in 'None' if you don't want to answer)"
                    },
                    {
                      type: "comment",
                      name: "personalInfoForPilot",
                      isRequired: true,
                      title: "Please leave your name if you want to let us know your participation. (Type in 'None' if you don't want to answer)"
                    },
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
  }

  

  const questionsToUpdate = [
    { pIdx: 3, qIdx: 1, inPanel: false, pName: 'page3', qName: 'explanationStrategies' },
    { pIdx: 4, qIdx: 1, inPanel: true, pName: 'page4', qName: 'explanationDisplay' },
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
    ['A', 'B', 'C', 'D', 'E', 'F'].map((idx, i) => {
      q.cells[idx]['Explanation'] = shuffledEs[i].exp;
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
    let jsonAllContents = getAllContents(dataForContext);
    updatedJsonAllContents = updateEs(questionsToUpdate, shuffledEs, jsonAllContents);
    updatedJsonAllContents = updateFeatures(dataForContext, updatedJsonAllContents);
    updatedJsonAllContents = updateScenario(dataForContext, updatedJsonAllContents);
    return (
      <div className="App">
        <Main 
          contents={updatedJsonAllContents}
          dataForContext={dataForContext}
          shuffledEs={shuffledEs}
        />
      </div>
    );
  }
  else
      return (<div></div>)
}

export default App;
