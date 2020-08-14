class Dieren{
    //Geef een paramater zoals je dat gewend bent in OOP  
    constructor(naam){
        this.name = name;
    }
    
    //Maak een functie
    HoudenVan(){
        console.log(this.name + ' houd van voedsel');
    }
}
//Extends betekend dat je een child, de parrent class, laat overwriten
class Leeuw extends Dieren{
    //Hier mag je de functie van de parrent class kopieëren, je verteld dat je gebruik wilt maken van de 
    //this in de parrent en dat heeft  'name' parameter
     HoudenVan(){
        console.log(this.name + ' houd van rouw vlees');
    }
}

let Simba = new Leeuw('Simba')
simba.eats();
