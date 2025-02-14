# Projet 6 Openclassrooms

## Base de données : installation
Vous pouvez d'abord créer et remplir votre base de données avec le script.sql qui se trouve dans back/src/main/resources/.  
Créez un fichier application.properties dans le répertoire back/src/main/resources/, et ajoutez puis modifiez ces lignes avec les informations de votre base de données :

> spring.datasource.url=jdbc:mysql://localhost:PORT/DATABASE NAME  
> spring.datasource.username=USERNAME    
> spring.datasource.password=PASSWORD  
> spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver  
> spring.jpa.hibernate.ddl-auto=update  
> spring.jpa.show-sql=true  
> jwt.secret=C928A33986D1777C596E99EF5CBA6F44EDE214F11C8F4CD31A856788642CDF4C8B9D57EFA66B947B5C5FDA9B287E711DB4DE9D435E8EC2D2BAF1  
> jwt.expiration=86400000

## Application
Pour lancer l'application, il faut déjà se déplacer dans le dossier /front et exécuter cette commande pour installer les dépendances :
```
npm install
```
Ensuite, en revenant à la racine, on fait de même pour dans le dossier /back :
```
mvn clean install
```

Maintenant que l'application est installé, pour la faire fonctionner, il faut, toujours dans le dosser /back, lancer cette commande :
```
mvn spring-boot:run
```
Puis, dans le dossier front :
```
ng serve --open
```

Il suffit ensuite de se rendre à l'adresse http://localhost:4200/
