class NeuralNetwork {
  constructor(neuronCounts) {
    this.levels = neuronCounts.slice(0, -1).map((count, i) => new Level(count, neuronCounts[i + 1]));
  }

  static feedForward(givenInputs, network) {
    let outputs = givenInputs;
    for (const level of network.levels) {
      outputs = Level.feedForward(outputs, level);
    }
    return outputs;
  }

  static mutate(network, amount = 1) {
    for (const level of network.levels) {
      level.biases = level.biases.map((bias) => lerp(bias, Math.random() * 2 - 1, amount));
      level.weights = level.weights.map((row) => row.map((weight) => lerp(weight, Math.random() * 2 - 1, amount)));
    }
  }
}

class Level {
  constructor(inputCount, outputCount) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount).fill(0);
    this.weights = Array.from({ length: inputCount }, () => new Array(outputCount).fill(0));
    Level.randomize(this);
  }

  static randomize(level) {
    level.weights.forEach((row) => {
      for (let j = 0; j < row.length; j++) {
        row[j] = Math.random() * 2 - 1;
      }
    });
    level.biases = level.biases.map(() => Math.random() * 2 - 1);
  }

  static feedForward(givenInputs, level) {
    level.inputs = givenInputs;
    for (let i = 0; i < level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      }
      level.outputs[i] = sum > level.biases[i] ? 1 : 0;
    }
    return level.outputs;
  }
}
