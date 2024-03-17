# Full Stack Development with Svelte & SvelteKit – Part II

This repository contains the project code for Part II of the workshop. On this readme, you can find all information
necessary to work the hands-on exercise of Part II.

## Resources

- [Svelte Documentation](https://svelte.dev/docs/introduction)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Available Lucide Icons](https://lucide.dev/icons/)
- [Pico (CSS) Documentation](https://picocss.com/docs)
- [Zod Documentation](https://zod.dev)
- [zod-form-data Documentation](https://www.npmjs.com/package/zod-form-data)
- [TypeORM Documentation](https://typeorm.io)

## Getting Started

First things first, you need to clone this repository to your local machine. After that, you first can install
dependencies and then initialize the environment variables. After that it should be possible to run the dev server,

If you prefer to work in a sandboxed browser environment, you can open the repository in StackBlitz, instead.
Everything should work the same.

<a href="https://stackblitz.com/github/nilsroehrig/full-stack-svelte-part-2">
    <img
    alt="Open in StackBlitz"
    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
    />
</a>

```bash
# clone the repo
git clone https://github.com/nilsroehrig/full-stack-svelte-part-2.git

# in repository folder, checkout exercise starting point
git checkout exercise

# install deps
npm ci

# initialize env
node init.js

# run dev server
npm run dev
```

The dev server is available at [localhost:5173](http://localhost:5173).

## Hands-On Exercise

### Creating Events
1. Add a new page at `/events/create` that contains a form to create a new event. 
2. The page should contain a form to enter all necessary information for an event. See the `Event` entity in the `server/src/entities` folder for reference.
3. The page should define a form action that processes the form data and creates a new event in the database. Use zod-form-data to validate the form data.
4. The new page should be accessible via the navigation bar. 

### Event Details
1. Add a new page at `/events/[id]` that accepts an event as a prop and displays the details of said event. This should include the name of the owner and the number of participants as well.
2. The page should display wether the current user is the owner of the event.
3. The page should define a server load function that fetches the event with id [id], as well as its related data from the database.
4. Clicking on an event in the events list should navigate to the event details page.

### Participating in & Leaving Events
1. On the event details page, add a button to participate in the event.
2. If the user is already participating in the event, the button should instead allow the user to leave the event.
3. The page should define form actions to handle the participation and leaving of events.

### Edit Events
1. Add a new page at `/events/[id]/edit` that accepts an event as a prop and contains a form to edit said event.
2. The page should define a server load function that fetches the event with id [id] from the database.
3. The page should define a form action that processes the form data and updates the event in the database.
4. It should not be possible to edit events of which the user is not the owner.
5. The page should be accessible via the event details page.

### Deleting Events
1. On the event details page, add the option to delete the event.
2. The page should define a form action that deletes the event from the database.
3. It should not be possible to delete events of which the user is not the owner.

### Displaying Participtions
1. On the startpage, add a new section that displays all events the user is participating in.

### Display All Events
1. Add a new page at `/events` that displays all events in the database.
2. The page should define a server load function that fetches all events from the database ordered by date. The `order` option of any repository find method can be used to achieve this.
3. The new page should be accessible via the navigation bar.
