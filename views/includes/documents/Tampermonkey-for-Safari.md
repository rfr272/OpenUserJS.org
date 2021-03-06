## Tampermonkey for Safari
<img src="https://raw.githubusercontent.com/wiki/OpenUserJS/OpenUserJS.org/images/tampermonkey_icon.min.svg?sanitize=true" width="128" height="128" align="right">

Tampermonkey is a userscript manager extension for [Android][android], [Chrome][Chrome], [Chromium][Chromium], [Edge][Edge], [Firefox][firefox], [Opera][Opera], [Safari][Safari], and other similar web browsers, written by Jan Biniok. There are also versions for [Android][tampermonkeyForAndroid], [Chrome][tampermonkeyForChrome], [Chromium][tampermonkeyForChromium], [Edge][tampermonkeyForEdge], [Firefox][tamperMonkeyForFirefox], and [Opera][tampermonkeyForOpera].

## WARNING!

Safari has end-of-life'd *(EOL)* .safariextz style extensions in version 13. Tampermonkey has made a notice at [Tampermonkey/tampermonkey#558 (comment)](https://github.com/Tampermonkey/tampermonkey/issues/558#issuecomment-506836395). If you have "Keep my software up to date" enabled on macOS you will be getting Safari 13 at any time and it will disable/remove Tampermonkey. It is currently, at the time of this notice, no longer available in the App Store. Please see the GitHub issue regarding potential intstallation methods if you have **not** upgraded Safari to version 13 and perhaps, meanwhile, an alternative.

### Installing Tampermonkey

To get userscripts going with the desktop version of Tampermonkey, first you have to install it from [Apple Safari Extensions][tampermonkeyApple].

![Screenshot of Tampermonkey page in tampermonkey.net][tampermonkeyTampermonkeySafariScreenshot1]

From the webpage, click the text "Install". Upon completion a Tampermonkey icon should appear next to the address bar.

### Installing Userscripts

Once Tampermonkey is installed, installing userscripts from [OpenUserJS.org][oujs] is simple. Navigate to the OpenUserJS page for the script, then click the blue "Install" button at the top of the page.

![Screenshot of an OpenUserJS script page][oujsScriptPageScreenshot1]

Tampermonkey will display a screen showing you where the userscript has come from, what websites it can access, its source code, and a warning to only install scripts from sources that you trust. If you do want to install the script, click the "Install" button, otherwise click "Cancel".

![Screenshot of Tampermonkey script installation][tampermonkeySafariScreenshot2]

Installing userscripts from other sources is a similar process. You just need to find the installation link for the script. This will be a button or link to a file with a name that ends ".user.js"

After installing a userscript, you won't normally notice any further changes until you visit a website that it runs on.

### Managing Userscripts

Clicking on the Tampermonkey icon at any time will pop up a menu that shows you what userscripts are running on the website you are looking at. It also lets you check for updated scripts *(it does daily automatic checks by default)*, and open the Tampermonkey Dashboard.

![Screenshot of Tampermonkey Dashboard][tampermonkeySafariScreenshot3]

In the Dashboard, the "Installed userscripts" tab is the main place to manage your userscripts. The number to the left of each script shows you the order they run in, and whether they are enabled *(green)* or disabled *(gray)* - click it to toggle the status. You can also uninstall userscripts *(trash can icon)*, check for new updates *(click the "Last updated" date)*, and some other icons related to the script management.

### Trouble shooting

If you think a userscript is causing problems, the easiest way to check is to switch off Tampermonkey, reload the web page, and see if the symptoms go away. You can do this by clicking on the Tampermonkey icon then clicking "Enabled"; the tick icon should change to a cross. If it looks like a script problem and you have more than one script running on a web page, you can disable them all in Tampermonkey's dashboard then re-enable them one by one, until you find the culprit. Remember to reload the web page each time - userscripts normally only run when a web page loads.

Sometimes, when you use more than one userscript on the same web page, they need to run in a particular order. You can change the order using the Tampermonkey dashboard. In the "Sort" column, click on the 'three lines' icon for the script you want to move, move the mouse up or down to change the order, then release.

### More

* [Get Tampermonkey from Apple Safari Extensions][tampermonkeyApple]
* [Tampermonkey.net][tampermonkeyNet] - documentation, discussion and downloads for other versions of Tampermonkey.

* [Tampermonkey for Android][tampermonkeyForAndroid]
* [Tampermonkey for Chrome][tampermonkeyForChrome]
* [Tampermonkey for Chromium][tampermonkeyForChromium]
* [Tampermonkey for Edge][tampermonkeyForEdge]
* [Tampermonkey for Firefox][tampermonkeyForFirefox]
* [Tampermonkey for Opera][tampermonkeyForOpera]

<!-- # References -->

<!-- ## Statics -->
[githubFavicon]: https://assets-cdn.github.com/favicon.ico
[oujsFavicon]: https://raw.githubusercontent.com/OpenUserJs/OpenUserJS.org/master/public/images/favicon16.png
[oujs]: https://openuserjs.org/

<!-- ## Browser pages -->
[android]: Android
[chrome]: Chrome
[chromium]: Chromium
[edge]: Edge
[firefox]: Firefox
[opera]: Opera
[safari]: Safari

<!-- ## .user.js engine external linkage -->
[tampermonkey]: http://tampermonkey.net/?ext=dhdg&browser=safari
[tampermonkeyNet]: http://tampermonkey.net
[tampermonkeyApple]: https://safari-extensions.apple.com/details/?id=net.tampermonkey.safari-G3XV72R5TC

<!-- ## Screenshots -->
[tampermonkeyTampermonkeySafariScreenshot1]: https://raw.githubusercontent.com/wiki/OpenUserJS/OpenUserJS.org/images/tampermonkey_sa1.gif "Tampermonkey in tampermonkey.net"
[oujsScriptPageScreenshot1]: https://raw.githubusercontent.com/wiki/OpenUserJS/OpenUserJS.org/images/openuserjs_script.gif "Ready to install a script"
[tampermonkeySafariScreenshot2]: https://raw.githubusercontent.com/wiki/OpenUserJS/OpenUserJS.org/images/tampermonkey_sa4.gif "Installing a script"
[tampermonkeySafariScreenshot3]: https://raw.githubusercontent.com/wiki/OpenUserJS/OpenUserJS.org/images/tampermonkey_sa5.png "Tampermonkey Dashboard"

<!-- ## Other related .user.js engine internal pages -->
[tampermonkeyForAndroid]: Tampermonkey-for-Android
[tampermonkeyForChrome]: Tampermonkey-for-Chrome
[tampermonkeyForChromium]: Tampermonkey-for-Chromium
[tampermonkeyForEdge]: Tampermonkey-for-Edge
[tampermonkeyForFirefox]: Tampermonkey-for-Firefox
[tampermonkeyForOpera]: Tampermonkey-for-Opera
[tampermonkeyForSafari]: Tampermonkey-for-Safari
