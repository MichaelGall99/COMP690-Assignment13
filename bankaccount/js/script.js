// REWRITTEN TO TAKE ADVANTAGE OF CLOSURES
const $ = (id) => document.getElementById(id)

const bankAccount = function (ownerName) {
    // PRIVATE VARIABLES AND FUNCTIONS
    let balance = 0.00
    let owner = ownerName   
    
    // PUBLIC METHODS THAT HAVE ACCESS TO PRIVATE VARIABLES AND FUNCTIONS
    return {
        withdrawal: function (withdrawalAmount) {
            return balance -= withdrawalAmount
        },
        deposit: function (depositAmount) {
            return balance += depositAmount
        },
        getBalance: function () {
            return balance
        },
        getOwnerName: function () {
            return owner
        },
        promptOwnerName: function () {
            let me = this

            return function() {
                let userName = ''

                do {
                    userName = prompt(`Please enter the bank account Owner's Name:`)

                    if (userName == null) {
                        alert('You either didn\'t enter a valid name or you clicked the Cancel button.  Exiting the Owner\s Name prompt.')
                    }
                } while (userName == null)

                if (userName != null) {
                    owner = userName

                    $('account_info').innerHTML = `${me.getOwnerName()} has a current balance of ${parseFloat(me.getBalance()).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}.`

                    // ONCE NAME IS SUCCESSFULLY ENTERED, DISABLE NAME BUTTON AND ENABLE DEPOSIT & WITHDRAWAL BUTTONS
                    toggleButtons('')
                }
            }
        },
        promptDepositAmount: function () {
            let me = this

            return function() {
                let userDeposit = 0

                do {
                    userDeposit = parseFloat(prompt(`Please enter the bank account Deposit Amount:`))

                    if (userDeposit == null || isNaN(userDeposit)) {
                        alert('You either didn\'t enter a valid Deposit Amount or you clicked the Cancel button.  Exiting the Deposit Amount prompt.')
                    } else if (userDeposit <= 0) {
                        alert('You entered an invalid Deposit Amount.  Please try again.')
                    }
                } while (userDeposit <= 0)

                if (!isNaN(userDeposit) && userDeposit != null && userDeposit > 0) {
                    me.deposit(userDeposit)

                    $('account_info').innerHTML = `${me.getOwnerName()} has a current balance of ${parseFloat(me.getBalance()).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}.`
                }
            }
        },
        promptWithdrawalAmount: function () {
            let me = this

            return function() {
                let userWithdrawal = 0

                do {
                    userWithdrawal = parseFloat(prompt(`Please enter the bank account Withdrawal Amount:`))

                    if (userWithdrawal == null || isNaN(userWithdrawal)) {
                        alert('You either didn\'t enter a valid Withdrawal Amount or you clicked the Cancel button.  Exiting the Withdrawal Amount prompt.')
                    } else if (userWithdrawal <= 0) {
                        alert('You entered a negative Withdrawal Amount.  Please try again.')
                    } else if (userWithdrawal > balance) {
                        alert(`Your Withdrawal Amount of $${userWithdrawal} exceeds your Balance Amount of $${balance}.`)
                    }
                } while (userWithdrawal <= 0)

                if (!isNaN(userWithdrawal) && userWithdrawal != null && userWithdrawal > 0 && userWithdrawal <= balance) {
                    me.withdrawal(userWithdrawal)

                    $('account_info').innerHTML = `${me.getOwnerName()} has a current balance of ${parseFloat(me.getBalance()).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}.`
                }
            }
        }
    }
}

// TOGGLE BUTTONS:
// -- WHEN NAME IS ENABLED, DISABLE DEPOSIT & WITHDRAWAL
// -- WHEN NAME IS DISABLED, ENABLE DEPOSIT & WITHDRAWAL
function toggleButtons(param) {
    let btnName = $('name')
    let btnDeposit = $('deposit')
    let btnWithdrawal = $('withdrawal')

    if (param === 'onload'){
        btnName.disabled = false
        btnDeposit.disabled = true
        btnWithdrawal.disabled = true
    } else {
        btnName.disabled = true
        btnDeposit.disabled = false
        btnWithdrawal.disabled = false
    }
}

// CREATE THE BANK ACCOUNT OBJECT
const account = bankAccount()

window.addEventListener('load', () => {

    // Name button was clicked
    $('name').onclick = account.promptOwnerName()

    // Deposit button was clicked
    $('deposit').onclick = account.promptDepositAmount()

    // Withdrawal button was clicked
    $('withdrawal').onclick = account.promptWithdrawalAmount()

    // DURING INTIAL PAGE LOAD, ENABLE NAME BUTTON & DISABLE DEPOSIT & WITHDRAWAL BUTTONS
    toggleButtons('onload')
})