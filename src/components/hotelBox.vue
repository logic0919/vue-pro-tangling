<template>
  <div class="hotel-card">
    <div class="image-container">
      <img :src="imageSrc" alt="Hotel Image" />
    </div>
    <div class="info-container">
      <div class="left">
        <div class="header">
          <span class="rank">{{ rank }}</span>
          <span class="name">{{ name }}</span>
          <span class="icon" v-if="iconSrc">
            <img :src="iconSrc" alt="Icon" />
          </span>
          <span class="label">{{ label }}</span>
        </div>
        <div class="location">
          {{ location }}
        </div>
        <div class="distance">
          {{ distance }}
        </div>
        <button class="reservation-button">{{ buttonText }}</button>
      </div>
      <div class="right">
        <div class="rating">
          <span class="score">{{ rating }}</span>
          <span class="reviews">共{{ reviews }}条点评</span>
          <span class="comment">{{ comment }}</span>
          <span class="order-time">{{ orderTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotelCard',
  props: {
    imageSrc: String,
    rank: String,
    name: String,
    iconSrc: String,
    label: String,
    location: String,
    distance: String,
    rating: String,
    reviews: Number,
    comment: String,
    orderTime: String,
    buttonText: String
  }
}
</script>

<style scoped>
.hotel-card {
  display: flex;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  margin-left: 20px;
  padding: 10px;
  border-radius: 8px;
  max-width: 600px;
}

.image-container img {
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.info-container {
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding-left: 10px;
}

.header {
  display: flex;
  align-items: center;
}

.rank {
  font-size: 1.2em;
  font-weight: bold;
  color: green;
  margin-right: 5px;
}

.name {
  font-size: 1.2em;
  font-weight: bold;
}

.icon img {
  width: 16px;
  height: 16px;
  margin-left: 5px;
}

.label {
  background-color: gold;
  color: white;
  padding: 2px 5px;
  border-radius: 4px;
  margin-left: 5px;
}

.location,
.distance {
  color: gray;
  font-size: 0.9em;
  margin: 5px 0;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rating span {
  margin-bottom: 5px;
}

.score {
  font-size: 1.4em;
  font-weight: bold;
  color: orange;
  margin-right: 5px;
}

.reviews {
  color: gray;
  font-size: 0.9em;
  margin-right: 5px;
}

.comment {
  font-size: 0.9em;
  color: red;
  margin-right: 5px;
}

.order-time {
  color: green;
  font-size: 0.9em;
}

.reservation-button {
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reservation-button:hover {
  background-color: darkred;
}
</style>
