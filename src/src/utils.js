import * as d3 from 'd3';
import _ from 'lodash';

export const randomizeExpChoices = (exps) => {
    return _.shuffle(exps);
}