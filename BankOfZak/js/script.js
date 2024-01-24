// GLOBAL VARIABLES
let id                  // THE ACCOUNT NUMBER (ID) TEXT BOX
let owner_name          // THE OWNER NAME (NAME) TEXT BOX
let balance             // THE INITIAL DEPOSIT (BALANCE) TEXT BOX
let accountsArray = []

// HELPER FUNCTION TO RETURN ELEMENT OBJECT DESCRIBING THE DOM ELEMENT OBJECT
// h t t p s://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
const $ = (id) => document.getElementById(id)

// HELPER FUNCTION TO RETURN ELEMENT OBJECT
// h t t p s://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
const $$ = (id) => document.querySelector(id)

// HELPER FUNCTION TO SET FOCUS & SELECT AN ELEMENT
const focusAndSelect = selector => {
    const elem = $$(selector)

    elem.focus();
    elem.select();
}

function formatAmount(amount) {
    return parseFloat(amount).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        })
}

const bankAccount = function (ownerName, initialBalance) {
    // PRIVATE VARIABLES AND FUNCTIONS
    let balance = parseFloat(initialBalance)
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
        promptDepositAmount: function () {
            let me = this
            let balanceStr = ''

            do {
                userDeposit = prompt(`Please enter the bank account Deposit Amount:`)

                if (userDeposit != null) {
                    if (userDeposit == null || (isNaN(userDeposit) && userDeposit.length > 0) || parseFloat(userDeposit) < 0) {
                        alert('Please enter a valid Deposit Amount.')
                    }
                }
            } while ((isNaN(userDeposit) && userDeposit.length > 0) || parseFloat(userDeposit) < 0)

            if (!isNaN(userDeposit) && userDeposit != null && parseFloat(userDeposit) >= 0) {
                me.deposit(parseFloat(userDeposit))
            }

            balanceStr = formatAmount(me.getBalance())

            return balanceStr
        },
        promptWithdrawalAmount: function () {
            let me = this
            let balanceStr = ''

            do {
                userWithdrawal = prompt(`Please enter the bank account Withdrawal Amount:`)

                if (userWithdrawal != null) {
                    if (userWithdrawal == null || (isNaN(userWithdrawal) && userWithdrawal.length > 0) || 
                    parseFloat(userWithdrawal) < 0) {
                        alert('Please enter a valid Withdrawal Amount.')
                    } else if (parseFloat(userWithdrawal) > me.getBalance()) {
                        alert(`INVALID TRANSACTION:  Your Withdrawal Amount of ${formatAmount(userWithdrawal)} exceeds your Balance Amount of ${formatAmount(me.getBalance())}.`)
                    }
                }
            } while ((isNaN(userWithdrawal) && userWithdrawal.length > 0) || userWithdrawal < 0 || 
            parseFloat(userWithdrawal) > me.getBalance())

            if (!isNaN(userWithdrawal) && userWithdrawal != null && parseFloat(userWithdrawal) >= 0 && parseFloat(userWithdrawal) <= me.getBalance()) {
                me.withdrawal(parseFloat(userWithdrawal))
            }

            balanceStr = formatAmount(me.getBalance())

            return balanceStr
        }
    }
}

function validateNewAcctInfo(idStr, owner_nameStr, balanceStr) {
    let validBool = true
    let regex = /^[A-Za-z\s]*$/;

    if (idStr.length != 8) {
        alert('Please enter a valid 8-Digit Account Number.')
        validBool = false
    }

    if (regex.test(owner_nameStr) === false) {
        alert('Please enter a valid Account Owner\'s Name (characters a-z, A-Z, or space only).')
        validBool = false
    }

    if (balanceStr == null || (isNaN(balanceStr) && balanceStr.length > 0) || parseFloat(balanceStr) < 0) {
        alert('Please enter a valid Initial Deposit Amount.')
        validBool = false            
    }

    return validBool
}

// GET BANK ACCOUNT ADD FORM AND BANK ACCOUNTS TABLE ELEMENTS FROM THE DOM
let form = document.getElementById('addForm')
let accounts = document.getElementById('accounts')

// SET A COUNT VARIABLE TO DISPLAY NEXT TO ACCOUNTS HEADER
let bankAcctCount
let mybankAcctCount = 0
bankAcctCount = $('bankAcctCount')
bankAcctCount.value = `(${mybankAcctCount})`

// ADD BANK ACCOUNT ROW TO THE BANK ACCOUNTS TABLE
form.addEventListener('submit', (e) => {
    "use strict"

    let arrayCount = 0

    // PREVENT FORM SUBMISSION
    e.preventDefault()

    // GET THE VALUES FROM THE TEXT BOXES
    id              = $('id')
    owner_name        = $('name')
    balance         = $('balance')

    if (validateNewAcctInfo(id.value, owner_name.value, balance.value)) {
        // CREATE A NEW BANK ACCOUNT OBJECT AND ADD IT TO THE BANK ACCOUNT ARRAY
        arrayCount = accountsArray.push(bankAccount(owner_name.value, balance.value))

        // INSERT A NEW ROW AT THE END OF THE ACCOUNTS TABLE
        let empTable = $('accounts')
        let tableRow = empTable.insertRow(-1)                          // THE -1 PARAMETER 'APPENDS' THE NEW ROW TO THE END OF THE TABLE

        // CREATE A NEW TABLE ROW CELL FOR EACH FORM FIELD PLUS THE DEPOSIT & WITHDRAWAL BUTTONS
        let idCell = tableRow.insertCell()
        let nameCell = tableRow.insertCell()
        let balanceCell = tableRow.insertCell()
        let depositCell = tableRow.insertCell()
        let withdrawalCell = tableRow.insertCell()

        // CREATE & POPULATE TEXT NODES FOR EACH CELL
        let idText = document.createTextNode(id.value)
        let nameText = document.createTextNode(owner_name.value)
        let balanceText = document.createTextNode(formatAmount(balance.value))

        // CREATE THE DEPOSIT BUTTON
        let depositBtn = document.createElement('button')               // CREATE A DEPOSIT BUTTON ELEMENT
        depositBtn.className = 'btn btn-success btn-sm float-end'       // ADD BOOTSTRAP CLASSES FOR THE BUTTON
        let textDeposit = document.createTextNode('Deposit')            // CREATE TEXT NODE FOR DEPOSIT BUTTON
        depositBtn.appendChild(textDeposit)                             // APPEND TEXT NODE TO DEPOSIT BUTTON

        // CREATE THE WITHDRAWAL BUTTON
        let withdrawalBtn = document.createElement('button')            // CREATE A WITHDRAWAL BUTTON ELEMENT
        withdrawalBtn.className = 'btn btn-danger btn-sm float-end'     // ADD BOOTSTRAP CLASSES FOR THE BUTTON
        let textWithdrawal = document.createTextNode('Withdrawal')      // CREATE TEXT NODE FOR DEPOSIT BUTTON
        withdrawalBtn.appendChild(textWithdrawal)                       // APPEND TEXT NODE TO DEPOSIT BUTTON

        // APPEND VALUES TO THE CELLS
        idCell.appendChild(idText)
        nameCell.appendChild(nameText)
        balanceCell.appendChild(balanceText)
        depositCell.appendChild(depositBtn)
        withdrawalCell.appendChild(withdrawalBtn)

        // APPEND CELLS TO THE NEW TABLE ROW
        tableRow.appendChild(idCell);
        tableRow.appendChild(nameCell);
        tableRow.appendChild(balanceCell);
        tableRow.appendChild(depositCell);
        tableRow.appendChild(withdrawalCell);

        // RESET THE FORM
        form.reset()
        
        // SET FOCUS BACK TO THE ID TEXT BOX
        focusAndSelect("#id")

        // INCREMENENT THE NUMBER OF ACCOUNTS IN THE TABLE
        mybankAcctCount ++
        bankAcctCount.value = `(${mybankAcctCount})`
            
    }
})

// DEPOSIT BUTTON EVENT HANDLER
accounts.addEventListener('click', (e) => {
    "use strict"

    let currBalance = ''

    // CHECK AND SEE IF THE DEPOSIT BUTTON WAS CLICKED
    if (e.target.classList.contains('btn-success')) {
        let idx = e.target.parentNode.parentNode.rowIndex

        // GET THE CURRENT BALANCE FOR THE CURRENT BANK ACCOUNT OWNER
        currBalance = accountsArray[idx-1].promptDepositAmount()

        // UPDATE THE CURRENT BALANCE ON THE WEBPAGE FOR THE CURRENT BANK ACCOUNT OWNER
        document.getElementById("accounts").rows.item(idx).cells[2].innerHTML = currBalance
    }
})

// WITHDRAWAL BUTTON EVENT HANDLER
accounts.addEventListener('click', (e) => {
    "use strict"

    let currBalance = ''

    // CHECK AND SEE IF THE DEPOSIT BUTTON WAS CLICKED
    if (e.target.classList.contains('btn-danger')) {
        let idx = e.target.parentNode.parentNode.rowIndex

        // GET THE CURRENT BALANCE FOR THE CURRENT BANK ACCOUNT OWNER
        currBalance = accountsArray[idx-1].promptWithdrawalAmount()

        // UPDATE THE CURRENT BALANCE ON THE WEBPAGE FOR THE CURRENT BANK ACCOUNT OWNER
        document.getElementById("accounts").rows.item(idx).cells[2].innerHTML = currBalance
    }
})
