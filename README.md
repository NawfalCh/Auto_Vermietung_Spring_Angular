<h1>Auto Vermietung App</h1>

<p>Die Autovermietungsplattform ermöglicht es Benutzern, Autos zu mieten, um die Plattform zu benutzen, muss der Benutzer erstmal zu registrieren und dann sich einlogen. Die App hat auch ein Admin Profile, um die Autos
und Bookings zu verwalten.</p>
<h3>Backend</h3>
<p>---------------</p>
<p>Das Backend ist mit Springboot implementiert,und die Sicherheit wird durch Spring Security und JWT-Token gewährleistet. Jeder API-Zugriff erfordert ein gültiges JWT-Token, das beim erfolgreichen Login eines Benutzers generiert wird. Die Rollenbasierte Autorisierung ist implementiert, wodurch verschiedene Endpunkte je nach Benutzerrolle zugänglich sind. Zum Beispiel können Administratoren auf administratives Dashboard zugreifen, während normale Benutzer auf die Hauptseite und Funktionen zur Fahrzeugauswahl zugreifen können. für die Implementierung der Sicherheit und JWT-Token sehe Packages <b>config</b> und <b>utils</b></p>
<h3>Login und JWT Token generierung:  </h3>
<img src="screenshots/postmanlogin.PNG" width="600" height="500">
<h3>Navigation mit JWT Token:</h3>
<img src="screenshots/postmanGetCars.PNG" width="600" height="500">

<h3>Frontend</h3>
<p>---------------</p>
<p>Das Frontend ist mit Angular 16 implementiert, und der Kommunikation mit Bachend erfoglt durch Rest API mit JWT-Token in Headers</p>
<h3>Signup und Login Views</h3>
<img src="screenshots/signup.PNG" width="600" height="500">
<img src="screenshots/login.PNG" width="600" height="500">
