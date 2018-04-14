Sample Modal for AEM Launch site
====================================

All credits to CodyHouse (http://codyhouse.co/gem/animated-transition-effects/)
[Terms](http://codyhouse.co/terms/)

  - Copy the modal code from line 24 till the end of the file.
  - Modernizer is included by default, take it out if its already included by WP
  - There is a fallback to include jquery from server if google server is down. This code(line 111)
  can be removed.
  - slider.js and main.js have been mashed into a min file and can be found within the js folder. Use this for
  production.
  - edit/use lines 28 to 41 in the html file for product icon, form fields and customising thank you message.
  - edit/use lines 64 to 85 in the main.js file for handing form UI and submission actions.
  - edit/use lines 43 to 97 in the html file for product title, description, gallery slide images and
  gallery slide contents.
  - everything else in the main.js file is for the modal and slider actions and would possibly need no intervention
  from your end. However if you still need to look into it, its pretty straight forward with comments inline.
  - the stylesheet is primary divided into 4 section as follows:
   - 1. Primary styles affecting the whole page - from lines 6 to 19
   - 2. Shared styles that are shared between different sections on the modal - from lines 28 to 250
   - 3. Slider styles - from lines 257 to 422
   - 4. Modal Scribble animation effect styles - from lines 429 to 516

  - ignore the other_effects directory as its just other modal effects from the link mentioned above.

