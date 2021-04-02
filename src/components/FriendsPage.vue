<template>
  <div class="friends_page">
    <h2>ZNAJOMI</h2>

    <FriendCardPage
      v-for="(element, index) in data"
      :key="{ index }"
      :gender="element.gender"
      :age="element.age"
      :city="element.city"
      :a="element.a"
      :b="element.b"
      :c="element.c"
      :interests="element.interests"
    />
  </div>
</template>

<script>
import FriendCardPage from "@/components/FriendCardPage.vue";

export default {
  components: { FriendCardPage },
  name: "FriendsList",
  data: () => ({
    amount: 0,
    data: [
      {
        gender: "Kobieta",
        age: 25,
        city: "Kraków",
        a: 30,
        b: 40,
        c: 50,
        interests: "Grafika, konie"
      },
      {
        a: 10,
        b: 40,
        c: 70,
      },
      {
        a: 20,
        b: 10,
        c: 80,
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.modal-dialog {
  width: 50%;
}
</style>
