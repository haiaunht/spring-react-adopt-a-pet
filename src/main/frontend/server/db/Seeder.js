import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/adopt_a_pet"
})

class Seeder {
  static async seed() {
    try {
      await pool.query(
        "INSERT INTO pet_types (type, img_url, description) VALUES ('Puppies', 'https://lh6.googleusercontent.com/proxy/0ZSx-8DUnx39CZubhaEgpb0puQm0cV5Kcldsd8KuS82cQSWnF-vyZZsJ1SP1pSSsVp6DKQWuYv3QAQ49KymwTqgCUQHkyQ7ZpNPBMXfz3Q=s0-d', 'Adorable Puppies');"
      )
      await pool.query(
        "INSERT INTO pet_types (type, img_url, description) VALUES ('Kitties', 'https://i.pinimg.com/originals/54/d9/45/54d945108a7b4db8a90d90fd03e34876.gif', 'Adorable Kitties');"
      )
      await pool.query(
        "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('Nala', 'https://science.sciencemag.org/content/sci/365/6449/136.7/F1.large.jpg?width=800&height=600&carousel=1', 3, true, 'This darling girl is ready to be shown off to your friends! Nala is a gorgeous female puppy that wants to light up your life. Nala will have a nose to tail vet check and arrive with a current health certificate. She will love running around town with you doing errands or snuggling at home to relax. Nala is eager to find her forever home. Do not miss out on this spectacular companion.', 'null', 1);"
      )
      await pool.query(
        "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('Tyson', 'https://photos.puppyspot.com/breeds/245/card/500000291_medium.jpg', 15, true,'Are you in search for the dearest and most loved puppy on earth? Well, look no further, because I am here. My name is Tyson, and Iam the cutest puppy that ever lived. My affectionate kisses will steal your heart over with the first one. I will arrive to my new home healthy, happy, vet checked and up to date on vaccinations. So, as you can see, I am the perfect best friend. Are you excited? Just remember, I am waiting on you!', 'null', 1 );"
      )
      await pool.query(
          "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('Carl', 'https://i.guim.co.uk/img/media/684c9d087dab923db1ce4057903f03293b07deac/205_132_1915_1150/master/1915.jpg?width=1200&height=1200&\n"
          + "quality=85&auto=format&fit=crop&s=14a95b5026c1567b823629ba35c40aa0', 13, true, 'This darling Carl is ready to be shown off to your friends!', 'null', 1);"
      )
      await pool.query(
        "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('Lili', 'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d', 12, true, 'There is not a cat who Lili does not get along with! If you have a cat who needs a buddy, consider Lili. She will need a calm environment and someone willing to help her trust the human household members, but we believe she will make an excellent companion given the time and patience needed.', 'null', 2 );"
      )
      await pool.query(
        "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('LadyBug', 'https://www.pasadosafehaven.org/wp-content/uploads/2021/05/Ladybug-cat-1.jpg', 13, true, 'Ladybug is a shy girl who depends on her kitty roommates for comfort, confidence, and cuddles. Her beautiful white fur stands out in the kitty puddles she is often found in, and often she can be seen with a cute little tongue blep. Pasado’s Safe Haven rescued this sweet girl from a hoarding situation, so she’s still learning that humans are her friends. Understandably, she can be a little fear reactive because of her past so she would do well going home with a family who would understand she will need her space and time to work through her shyness. If you’re the calm, patient family for her, she’d love to meet you!', 'null', 2 );"
      )
      await pool.query(
          "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, adoption_status, type_id ) VALUES ('Goku', 'https://cdn.britannica.com/22/206222-131-E921E1FB/Domestic-feline-tabby-cat.jpg', 8, true, 'Goku is a shy boy who depends on his kitty roommates for comfort, confidence, and cuddles.', 'null', 2 );"
      )

      pool.end()
    } catch (error) {
      console.error(error)
      pool.end()
    }
  }
}

export default Seeder
