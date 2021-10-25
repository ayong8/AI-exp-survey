import React, { useRef, useEffect } from "react";
import * as d3 from 'd3';
import * as Survey from "survey-react";
import "survey-react/modern.css";

import First from "./First";

Survey.StylesManager.applyTheme("modern");
// Survey.Survey.cssType = "bootstrap";

const Main = () => {
  const ref = useRef(null);

  useEffect(() => {
    d3.select('#sp_102').select('.sv-page').append('div').lower();
  });

  var json = {
    title:
      "Minimum data reporting form – for suspected and probable cases of COVID-19",
    pages: [
      {
        name: "page1",
        navigationTitle: "Collector",
        navigationDescription: "Collector's info",
        elements: [
          {
            type: "radiogroup",
            name: "car",
            title: "What car are you driving?",
            isRequired: true,
            hasNone: true,
            colCount: 4,
            choices: [
              "Ford",
              "Vauxhall",
              "Volkswagen",
              "Nissan",
              "Audi",
              "Mercedes-Benz",
              "BMW",
              "Peugeot",
              "Toyota",
              "Citroen",
            ],
          },
          {
            type: "rating",
            name: "nps_score",
            title:
              "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            isRequired: true,
            rateMin: 0,
            rateMax: 10,
            minRateDescription: "(Most unlikely)",
            maxRateDescription: "(Most likely)",
          },
          {
            type: "matrix",
            name: "Quality",
            title:
              "Please indicate if you agree or disagree with the following statements",
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
                value: "affordable",
                text: "Product is affordable",
              },
              {
                value: "does what it claims",
                text: "Product does what it claims",
              },
              {
                value: "better then others",
                text: "Product is better than other products on the market",
              },
              {
                value: "easy to use",
                text: "Product is easy to use",
              },
            ],
          },
        ],
      },
      {
        name: "page1",
        navigationTitle: "Collector",
        navigationDescription: "Collector's info",
        elements: [
          {
            type: "radiogroup",
            name: "car",
            title: "What car are you driving?",
            isRequired: true,
            hasNone: true,
            colCount: 4,
            choices: [
              "Ford",
              "Vauxhall",
              "Volkswagen",
              "Nissan",
              "Audi",
              "Mercedes-Benz",
              "BMW",
              "Peugeot",
              "Toyota",
              "Citroen",
            ],
          },
          {
            type: "rating",
            name: "nps_score",
            title:
              "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            isRequired: true,
            rateMin: 0,
            rateMax: 10,
            minRateDescription: "(Most unlikely)",
            maxRateDescription: "(Most likely)",
          },
          {
            type: "matrix",
            name: "Quality",
            title:
              "Please indicate if you agree or disagree with the following statements",
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
                value: "affordable",
                text: "Product is affordable",
              },
              {
                value: "does what it claims",
                text: "Product does what it claims",
              },
              {
                value: "better then others",
                text: "Product is better than other products on the market",
              },
              {
                value: "easy to use",
                text: "Product is easy to use",
              },
            ],
          },
        ],
      },
    ],
  };

  let survey = new Survey.Model(json);

  survey.onComplete.add(function (sender) {
    document.querySelector("#surveyResult").textContent =
      "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
  });

  survey.onUpdateQuestionCssClasses.add(function (survey, options, i) {
    var classes = options.cssClasses;

    console.log("classes: ", i, classes, survey, options);

    classes.mainRoot += " " + options.question.name;
    classes.mainRoot += " sv_qstn";
    classes.root = "sq-root";
    classes.title += " sq-title";
    classes.item += " sq-item";
    classes.label += " sq-label";

    if (options.question.isRequired) {
      classes.title += " sq-title-required";
      classes.root += " sq-root-required";
    }

    if (options.question.getType() === "checkbox") {
      classes.root += " sq-root-cb";
    }
  });

  return (
    <div className="App">
      <Survey.Survey model={survey} ref={ref} />
      <First />
    </div>
  );
}

export default Main;
