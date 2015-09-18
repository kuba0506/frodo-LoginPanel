/**
 *     __    ____  ______
    / /   / __ \/ ____/
   / /   / / / / / __  
  / /___/ /_/ / /_/ /  
 /_____/\____/\____/   
                       
 */

function log() {
    try {
        console.log.apply(console, arguments);
    } catch (e) {
        try {
            opera.postError.apply(opera, arguments);
        } catch (e) {
            alert(Array.prototype.join.call(arguments, ''));
        }
    }
}