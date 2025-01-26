const arrayContainer = document.querySelector(".array-container");
const commentary = document.getElementById("commentary");
const generateButton = document.getElementById("generate");
const sortButton = document.getElementById("sort");
const speedSlider = document.getElementById("speed");
const algorithmSelector = document.getElementById("algorithm");

let array = [];
let delay = 100;

// Generate a new array
function generateArray() {
    array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
    renderArray();
    updateCommentary("Array generated. Select an algorithm and start sorting.");
}

// Render the array as bars
function renderArray() {
    arrayContainer.innerHTML = "";
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${100 / array.length}%`;
        bar.classList.add("bar");
        arrayContainer.appendChild(bar);
    });
}

// Delay for animation
function delayTime() {
    return new Promise(resolve => setTimeout(resolve, delay));
}

// Highlight bars during sorting
function highlightBars(indices, highlightClass) {
    const bars = document.querySelectorAll(".bar");
    indices.forEach(index => bars[index].classList.add(highlightClass));
    return new Promise(resolve => setTimeout(() => {
        indices.forEach(index => bars[index].classList.remove(highlightClass));
        resolve();
    }, delay));
}

// Update commentary
function updateCommentary(text) {
    commentary.textContent = text;
}

// Explanations for sorting algorithms
function explainAlgorithm(algorithm) {
    const explanations = {
        "bubble": "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. It has a time complexity of O(n^2).",
        "insertion": "Insertion Sort builds the sorted array one item at a time by comparing and inserting elements into their correct position. It has a time complexity of O(n^2).",
        "merge": "Merge Sort divides the array into halves, recursively sorts them, and merges the sorted halves. It has a time complexity of O(n log n)."
    };
    return explanations[algorithm] || "No explanation available for this algorithm.";
}

// Bubble Sort with animation
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            await highlightBars([j, j + 1], "active");
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray();
                await delayTime();
            }
        }
    }
    updateCommentary("Sorting complete!");
}

// Insertion Sort with animation
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            await highlightBars([j + 1], "active");
            array[j + 1] = array[j];
            renderArray();
            j--;
            await delayTime();
        }
        array[j + 1] = key;
        renderArray();
    }
    updateCommentary("Sorting complete!");
}

// Merge Sort with animation
async function mergeSort(array, left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    await mergeSort(array, left, mid);
    await mergeSort(array, mid + 1, right);
    await merge(array, left, mid, right);
}

async function merge(array, left, mid, right) {
    let leftArray = array.slice(left, mid + 1);
    let rightArray = array.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        await highlightBars([k], "active");
        if (leftArray[i] <= rightArray[j]) {
            array[k++] = leftArray[i++];
        } else {
            array[k++] = rightArray[j++];
        }
        renderArray();
        await delayTime();
    }

    while (i < leftArray.length) {
        await highlightBars([k], "active");
        array[k++] = leftArray[i++];
        renderArray();
        await delayTime();
    }

    while (j < rightArray.length) {
        await highlightBars([k], "active");
        array[k++] = rightArray[j++];
        renderArray();
        await delayTime();
    }
}

// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    generateButton.addEventListener("click", generateArray);

    sortButton.addEventListener("click", async () => {
        if (array.length === 0) {
            updateCommentary("Array is empty. Generate a new array first.");
            return;
        }
        const algorithm = algorithmSelector.value;
        updateCommentary(explainAlgorithm(algorithm));
        delay = 200 - speedSlider.value * 2;
        try {
            if (algorithm === "bubble") {
                await bubbleSort();
            } else if (algorithm === "insertion") {
                await insertionSort();
            } else if (algorithm === "merge") {
                await mergeSort(array, 0, array.length - 1);
            } else {
                updateCommentary("Algorithm not recognized.");
                return;
            }
            updateCommentary("Sorting complete!");
        } catch (error) {
            updateCommentary(`Error during sorting: ${error.message}`);
            console.error(error);
        }
    });

    generateArray();
});




