const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 50;
const cars = generateCars(N);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.1);
    }
  }
}

const traffic = [];
const trafficCarCount = 100;
const laneCount = 3;
const minSpeed = 2.1;
const maxSpeed = 2.82;

for (let i = 0; i < trafficCarCount; i++) {
  const laneIndex = Math.floor(Math.random() * laneCount);
  const laneCenter = road.getLaneCenter(laneIndex);
  const laneOffset = (Math.random() - 0.5) * 25;
  let speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
  const car = new Car(laneCenter + laneOffset, -i * 130, 30, 50, "DUMMY", speed, getRandomColor());
  traffic.push(car);
}

function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
  location.reload();
}

function reset() {
  location.reload();
}

function discard() {
  localStorage.removeItem("bestBrain");
  location.reload();
}

function generateCars(N) {
  return Array.from({ length: N }, (_, i) => new Car(road.getRandomLane(), 100, 30, 50, "AI"));
}

let deletedCars = [];
animate();

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }
  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;
  carCtx.save();
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);
  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx);
  }
  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx);
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, true);
  carCtx.restore();
  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);
  const closestCar = findClosestCar(bestCar, traffic);
  const distance = calculateDistance(bestCar, closestCar);
  for (let i = 0; i < traffic.length; i++) {
    const currentCar = traffic[i];
    if (bestCar.y < currentCar.y - 150) {
      traffic.splice(i, 1);
      deletedCars.push(currentCar);
      const deletedCarsCountElement = document.getElementById("deletedCarsCount");
      deletedCarsCountElement.textContent = "Score: " + deletedCars.length;
      createNewCar();
      i--;
    }
    for (let i = 1; i < cars.length; i++) {
      const currentCar = cars[i];
      if (bestCar.y < currentCar.y - 200) {
        cars.splice(i, 1);
        i--;
      }
    }
  }
  requestAnimationFrame(animate);
}

function findClosestCar(targetCar, cars) {
  let closestCar = null;
  let closestDistance = Infinity;
  for (let i = 0; i < cars.length; i++) {
    const distance = calculateDistance(targetCar, cars[i]);
    if (distance < closestDistance) {
      closestCar = cars[i];
      closestDistance = distance;
    }
  }
  return closestCar;
}

function calculateDistance(car1, car2) {
  const dx = car2.x - car1.x;
  const dy = car2.y - car1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function createNewCar() {
  const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
  const laneIndex = Math.floor(Math.random() * laneCount);
  const laneCenter = road.getLaneCenter(laneIndex);
  const laneOffset = (Math.random() - 0.5) * 25;
  const newCar = new Car(laneCenter + laneOffset, bestCar.y - 750, 30, 50, "DUMMY", speed, getRandomColor());
  traffic.push(newCar);
}
