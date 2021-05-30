<template>
  <b-card>
          <table>
              <tr>
                <th></th>
                <th id="done">Ukończone</th>
                <th id="statusy">W trakcie realizacji</th>
                <th id="todo">W planach</th>
              </tr>
              <tr>
                <th id="journey">PODRÓŻE</th>
                <td>{{ data.done[0] }}</td>
                <td>{{ data.now[0] }}</td>
                <td>{{ data.todo[0] }}</td>
              </tr>
              <tr>
                <th id="food">JEDZENIE I KUCHNIA</th>
                <td>{{ data.done[1] }}</td>
                <td>{{ data.now[1] }}</td>
                <td>{{ data.todo[1] }}</td>
              </tr>
              <tr>
                <th id="career">KARIERA</th>
                <td>{{ data.done[2] }}</td>
                <td>{{ data.now[2] }}</td>
                <td>{{ data.todo[2] }}</td>
              </tr>
              <tr>
                <th id="love">MIŁOŚĆ I RODZINA</th>
                <td>{{ data.done[3] }}</td>
                <td>{{ data.now[3] }}</td>
                <td>{{ data.todo[3] }}</td>
              </tr>
              <tr>
                <th id="other">INNE</th>
                <td>{{ data.done[4] }}</td>
                <td>{{ data.now[4] }}</td>
                <td>{{ data.todo[4] }}</td>
              </tr>
              <tr>
                <th id="sport">SPORT</th>
                <td>{{ data.done[5] }}</td>
                <td>{{ data.now[5] }}</td>
                <td>{{ data.todo[5] }}</td>
              </tr>
            </table>
  </b-card>
</template>

<script>
export default {
  name: "CompareTable",
  props: 
    {
      data: {
        type: Object,
      },
    },
};
</script>

<style>
#journey {
  color: #ff8a8f;
  font-weight: bold;
}
#food {
  color: #f6d6a6;
  font-weight: bold;
}
#career {
  color: #bad6ba;
  font-weight: bold;
}
#love {
  color: #dfb8f4;
  font-weight: bold;
}
#other {
  color: #92dcef;
  font-weight: bold;
}
#sport {
  color: #edb5db;
  font-weight: bold;
}
table {
  margin-top: 1em;
}
td {
  text-align: center;
}
#statusy {
  padding-right: 10px;
  padding-left: 10px;
  color: #ddba1f;
}
#todo {
  color: #1cd5df;
}
#done {
  color: #28d66b;
}
th {
text-align: end;
}
</style>