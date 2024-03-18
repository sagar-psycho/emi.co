function handleKeyPress(event) {
    if (event.keyCode === 13) { // Enter key
        calculateEMI();
    }
}

function calculateEMI() {
    const loanAmount = document.getElementById('loanAmount').value;
    const interestRate = document.getElementById('interestRate').value / 100 / 12; // Convert annual rate to monthly
    const loanTenure = document.getElementById('loanTenure').value;

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(function(element) {
        element.innerHTML = '';
    });

    // Check for empty fields
    if (!loanAmount) {
        document.getElementById('loanAmountError').innerHTML = 'Please enter loan amount.';
    }
    if (!interestRate) {
        document.getElementById('interestRateError').innerHTML = 'Please enter interest rate.';
    }
    if (!loanTenure) {
        document.getElementById('loanTenureError').innerHTML = 'Please enter loan tenure.';
    }

    if (loanAmount && interestRate && loanTenure) {
        const emi = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTenure)) / (Math.pow(1 + interestRate, loanTenure) - 1);
        document.getElementById('result').innerHTML = `EMI: ${emi.toFixed(2)}`;

        // Explanation of interest calculation
        const totalInterest = (emi * loanTenure) - loanAmount;
        const interestExplanation = `Over the period of ${loanTenure} months, you will pay an additional amount of ${totalInterest.toFixed(2)} as interest on the loan.`;
        document.getElementById('interestExplanation').innerHTML = interestExplanation;

        // Calculate total amount
        const totalAmount = parseFloat(loanAmount) + parseFloat(totalInterest);
        document.getElementById('totalAmount').innerHTML = `Total Amount to be paid: ${totalAmount.toFixed(2)}`;
    }
}