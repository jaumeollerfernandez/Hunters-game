class GameObject{
    constructor(config){
        this.x = config.x || 0; //o escoge el valor que le pasemos por config, o le pasamos 0
        this.y = config.y || 0;//Lo mismo pero con y
        this.sprite = new Sprite({

             gameObject :this,
             src: config.src || "images/characters/people/hero.png",
            }

        );
    }
}