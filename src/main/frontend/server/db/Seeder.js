import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/adopt_a_pet"
})

class Seeder {
  static async seed() {
    try {
      await pool.query(
        "INSERT INTO pet_types (type, img_url, description) VALUES ('Puppies', 'https://imagesvc.meredithcorp.io/v3/jumpstartpure/image?url=https://timeincsecure-a.akamaihd.net/rtmp_uds/3281700261001/201904/2112/3281700261001_6021263744001_6021254011001-vs.jpg?pubId=3281700261001&videoId=6021254011001&w=1280&h=720&q=90&c=cc', 'Adorable Puppies');"
      )
      await pool.query(
        "INSERT INTO pet_types (type, img_url, description) VALUES ('Kitties', 'https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop', 'Adorable Kitties');"
      )
      await pool.query(
        "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('Nala', 'https://www.rover.com/blog/wp-content/uploads/2018/11/rottweiler-869018_1920.jpg', 3, true, 'This darling girl is ready to be shown off to your friends! Nala is a gorgeous female puppy that wants to light up your life. Nala will have a nose to tail vet check and arrive with a current health certificate. She will love running around town with you doing errands or snuggling at home to relax. Nala is eager to find her forever home. Do nott miss out on this spectacular companion.', true, 1);"
      )
      await pool.query(
        "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('Tyson', 'https://photos.puppyspot.com/breeds/245/card/500000291_medium.jpg', 5, true,'Are you in search for the dearest and most loved puppy on earth? Well, look no further, because I am here. My name is Tyson, and Iam the cutest puppy that ever lived. My affectionate kisses will steal your heart over with the first one. I will arrive to my new home healthy, happy, vet checked and up to date on vaccinations. So, as you can see, I am the perfect best friend. Are you excited? Just remember, I am waiting on you!', true, 1 );"
      )
      await pool.query(
        "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('Lili', 'https://mk0bhmainwebsitl8fiu.kinstacdn.com/wp-content/uploads/2020/09/Screen-Shot-2020-09-29-at-1.52.49-PM-1024x664.png', 1, true, 'There is not a cat who Lili does not get along with! If you have a cat who needs a buddy, consider Lili. She will need a calm environment and someone willing to help her trust the human household members, but we believe she will make an excellent companion given the time and patience needed.', true, 2 );"
      )
      await pool.query(
        "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('LadyBug', 'https://www.pasadosafehaven.org/wp-content/uploads/2021/05/Ladybug-cat-1.jpg', 3, true, 'Ladybug is a shy girl who depends on her kitty roommates for comfort, confidence, and cuddles. Her beautiful white fur stands out in the kitty puddles she is often found in, and often she can be seen with a cute little tongue blep. Pasado’s Safe Haven rescued this sweet girl from a hoarding situation, so she’s still learning that humans are her friends. Understandably, she can be a little fear reactive because of her past so she would do well going home with a family who would understand she will need her space and time to work through her shyness. If you’re the calm, patient family for her, she’d love to meet you!', true, 2 );"
      )

      pool.end()
    } catch (error) {
      console.error(error)
      pool.end()
    }
  }
}

export default Seeder
