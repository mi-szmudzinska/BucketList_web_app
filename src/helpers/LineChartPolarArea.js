import { PolarArea, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: PolarArea,
  mixins: [reactiveProp],
  props: ["chartData"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
