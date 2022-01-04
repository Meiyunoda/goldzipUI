answers are denoted by `-`

manual activity requires dual approval: `doer` and `checker` or even `admin`

# types of user with different right:
1. goldzip admin  
    - check/ update all redemption records
1. kyc admin
    - pass or fail a redemption
1. vault admin
    - update gold bar collection/location status
1. normal user who holds goldzip
    1. individual
    1. corporate


# questions:
1. any preference on auth/ database? 
- ali cloud

1. text for t&c...

1. redemption record update in place or new version?
    1. in place: edited record is always new
    1. new version: showing the latest version of record and old version is visible to admins
    - versioning
1. how is the electronic transfer signed?
    - hello sign (goldzip managers need to talk to vault with this)

1. what if insufficient fund after kyc?
- allow they pay for kyc
- alert user that minimum redemption unit of gold bar is 1000 goldzip token

1. what if user do NOT collect goldzip
    - `charge` them for overdue (5g per 30 calendar days)
    - `charge` means showing a deducted Book value of their previous redemption while they initiate new redemption

1. how to know if curtain goldzip token is collected?
    - better not manual, if manual need maker and checker
    1. manual checking the wallet balance?
    1. check blockchain status?

1. do we have to manage inventory record?
- yes and gold bar logistic info


## user journey:
1. register with email, password, details based on user type
1. redeem goldzip with collection method, goldzip quantity, deadline (within 30 calendar days)
1. pay tx fee within 72 hours 
1. kyc respect to collection method
1. redemption is approved
1. update gold bar location
1. collect gold bar
    - success
        1. end of user journey
    - fail
        1. is the goldzip return?
        - no, it will be accumulated in clients' account as unresolved event.
1. update gold bar location and inventory
1. 


## gold bar redemption flow:
1. user initiate redemption
    1. goldzip quantity
    2. collection method
    3. collection date
    4. collection site
1. pay tx fee and kyc fee
1. kyc


## kyc (how is it done???):
1. store data in cloud db
1. (?) admin portal for kyc admin to pass a redemption

- store info in cloud db, validator will grade it manually or machine auto validate via api

-------------------------------------------
can user be both individual and corporate?
select one at register

if collected by appointed, what if the user doesn't fill the form at the collection day?
count as late collection

how to corporate with goldzip IT team?
no need, just talk to Berry.