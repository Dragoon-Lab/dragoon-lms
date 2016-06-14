# dragoon-lms

To set up server:

1. Create a new database.
2. Clone a copy of the Drupal 7 repot into a temp dir.
3. Install Drupal, connect with new database.
4. Clone this repot into the desired dir.
5. Rename the sites folder in the drupal 7 temp dir to something temporary.
6. Copy the contents of the Drupal 7 temp dir into this repot's dir.  (Now this repot's sites and the drupal base copy are in the same root dir.)
7. Copy the contents of the sites/default/ folder into this repot's sites/default to get the working setting.
8. Delete the temporary sites dir and the original drupal 7 temp dir (step 2).


