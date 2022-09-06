# Welcome to Yaptrack!

YapTrack is my front-end capstone project for NSS cohort E-19. 

YapTrack is designed to keep track of all of your bills in one place! With a simple, easy-to-use interface, you can see which bills are overdue, due soon, or even paid! 

But wait! There's more! 

You can also keep track of all your payments, "close" a bill, "pay" bills, and search through all of your bills.

# Starting the App

To start YapTrack, run npm install or npm i to install all dependencies.

To run server, npm run dev

# Pages


### Dashboard

![alt text](/public/dashboard.png)

The Dashboard/Landing Page is the first screen users see after logging in.

Users can:
  - See their Overdue Bills
  - See their Bills Due Soon
  - See their Recently Paid Bills


### My Bills Page

![alt text](/public/myBillsPage.png)

The My Bills Page allows users to see all their bills in one place.

Users can:
  - Filter their bills by "tag"
  - See only their Closed bills


### My Payments Page

![alt text](/public/myPaymentsPage.png)

The My Payments Page allows users to see all of their bill payments in one one place.

Users can:
  - See which bills payments belong to
  - See the Amount Paid
  - See the Date Paid
  - See the Date Due


# Components


### Bill Card

![alt text](/public/billCard.png)
![alt text](/public/billCardMenu.png)

The Bill Card is a visual representation of a user's bill.

Bill Cards Show:
  - Payee (who the bill is going to)
  - Amount due
  - When the next payment is due
  - When the last payment was made

Additionally, when clicking on the ellipses, a bill card action menu pops up.

Using the bill card action menu, users can:
  - Mark a bill as paid (for current billing cycle)
  - Pay a bill (will take user to specified bill payment portal)
  - Edit a bill
  - Delete a bill (this will delete all bill payment records as well)



### Bill Form

Create Bill Form
![alt text](/public/createBillForm.png)

By clicking the + on the top right of the nav bar, the create bill component will render.

Users can specify:
  - Who the bill is for (payee)
  - The payment portal Url for their bill
  - When the bill is due
  - How much is due
  - Bill tag (category)
  - How often the bill is due (recurrence)

Update Bill Form
![alt text](/public/updateBillForm.png)

By clicking the edit bill button on the bill card action menu, the edit bill component will render.

Users can specify:
  - Who the bill is for (payee)
  - The payment portal Url for their bill
  - When the bill is due
  - How much is due
  - Bill tag (category)
  - Whether to close the bill (remove bill tracking functionality but maintain record of bill payments) or not


### Search Bar

![alt text](/public/searchBar.png)
![alt text](/public/searchBarResults.png)

The Search Bar lets a user search for bills by bill name (payee).

Bill Cards Show:
  - Bills will populate on search page with payee names that have keywords of value searched.

### Planning

I used LucidChart and Figma to create Our ERD and Wireframe. 

Link to Figma for Flowchart:
https://www.figma.com/file/wM26rmGFAyLzIIqV0ebb6i/YapTrack-WireFrame

Link to LucidChart for ERD:
https://lucid.app/lucidchart/f480fe95-3301-41b2-b35a-1eec25d9b870/edit?viewport_loc=-668%2C-1350%2C4032%2C1605%2C0_0&invitationId=inv_68e0f9e8-df49-436c-9a57-f83b4719ea13#

Please pay me if you made it this far. Venmo @mmccullough1997
