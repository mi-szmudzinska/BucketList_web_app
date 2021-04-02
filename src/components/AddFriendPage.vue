<template>
  <div class="friends_page">
    <h2>Szukaj znajomego</h2>

    <md-autocomplete class="search" >
      <label>Wyszukaj...</label>
    </md-autocomplete>

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
  name: "AddFriends",
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
    ],
  }),
};
</script>

<style lang="scss" scoped>
.modal-dialog {
  width: 50%;
}
.search {
  background-color: #eeeeee;
  border-radius: 10px;
  width: 50%;
}
</style>
