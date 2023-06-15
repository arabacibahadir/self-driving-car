# Simple Neural Network Implementation in JavaScript
This repository contains a simple implementation of a neural network written in JavaScript. The neural network is designed to have multiple levels, each consisting of a set of neurons. The code provides functionalities for feed-forwarding inputs through the network and mutating the network's parameters.


https://github.com/arabacibahadir/self-driving-car/assets/32988819/b773ec31-b3e2-4918-be85-5da70f30b163


## Architecture
The neural network is represented by the NeuralNetwork class. It takes an array neuronCounts as input, which specifies the number of neurons in each level of the network. The constructor creates the levels of the network based on the given neuron counts.

The Level class represents an individual level of the network. Each level contains inputs, outputs, biases, and weights. The biases and weights determine the behavior of the neurons in the level. The Level class also provides methods for randomizing the biases and weights and for performing the feed-forward operation.

## Usage
To use the neural network, follow these steps:
1. Create an instance of the NeuralNetwork class by providing an array of neuron counts representing the architecture of the network.
````javascript
const network = new NeuralNetwork([2, 3, 1]);
````
In this example, the network has three levels: the first level has 2 neurons, the second level has 3 neurons, and the third level has 1 neuron.

2. Feed forward inputs through the network using the feedForward method.

````javascript
const inputs = [0.5, 0.8];
const outputs = NeuralNetwork.feedForward(inputs, network);
````

The feedForward method takes an array of inputs and the network as parameters and returns an array of outputs.

3. Mutate the network's parameters using the mutate method.

````javascript
NeuralNetwork.mutate(network, 0.1);
````
The mutate method allows you to introduce random variations in the network's biases and weights. The optional amount parameter determines the magnitude of the mutations.

## Example
Here's a simple example that demonstrates the usage of the neural network:
````javascript
// Create a neural network with 2 inputs, 2 hidden neurons, and 1 output
const network = new NeuralNetwork([2, 2, 1]);

// Feed forward inputs
const inputs = [0.2, 0.6];
const outputs = NeuralNetwork.feedForward(inputs, network);
console.log(outputs); // Output: [0.813]

// Mutate the network
NeuralNetwork.mutate(network, 0.2);
````
In this example, the network is initialized with 2 inputs, 2 hidden neurons, and 1 output neuron. The inputs [0.2, 0.6] are fed forward through the network, producing an output of approximately [0.813]. Finally, the network is mutated with a magnitude of 0.2.
