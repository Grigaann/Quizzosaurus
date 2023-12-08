-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2023 at 09:52 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quizzosaurus`
--

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(255) NOT NULL,
  `question` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL COMMENT 'WIP',
  `res1` varchar(255) NOT NULL,
  `res2` varchar(255) NOT NULL,
  `res3` varchar(255) NOT NULL,
  `res4` varchar(255) NOT NULL,
  `correct` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `question`, `category`, `res1`, `res2`, `res3`, `res4`, `correct`) VALUES
(1, 'Which Dinosaur period lasted the longest ?', '', 'Mesozoic', 'Triassic', 'Jurassic', 'Cretaceous', 4),
(2, 'What is the full name of the T.Rex ?', '', 'Tyrannosaurus rex', 'Tyrannausaurus rex', 'Tyrannosaurus reix', 'Tyrannausaurus reix', 1),
(3, 'How long was an average Diplodocus ?', '', '32 m', '47 m', '28 m', '19 m', 3),
(4, 'When was discovered the first Dinosaur ?', '', '1918', '1824', '1839', '1909', 2),
(5, 'What does Dinosaur mean ?', '', 'Horrible Lizard', 'Giant Lizard', 'Huge Lizard', 'Terrible Lizard', 4),
(6, 'Which Dinosaur are \'Good girls\' according to Robert Muldoon from Jurrasic Park ?', '', 'T.Rex', 'Velociraptor', 'Deinonychus', 'Stegosaurus', 3),
(7, 'Which of these Dinosaurs was an aquatic one ?', '', 'Malawisaurus', 'Basilosaurus', 'Dubreuillosaurus', 'Psittacosaurus', 2),
(8, 'When did the Dinosaur go extinct ?', '', '-65 Ma', '-50 Ma', '-75 Ma', '-70 Ma', 1),
(9, 'How high was an average Velociraptor ?', '', '2 m', '1.5 m', '0.5 m', '1 m', 3),
(10, 'How did a Dinosaur fossilize ?', '', 'Permineralization : the tissue absorb mineral water', 'Carbonification : Pressure carbonifie the skeleton', 'Replacement: Minerals replace the organic material', 'Impression: An imprint of the organism is left in sediment', 1),
(11, 'Which pair of Dinosaurs are in the same family ?', '', 'Ankylosaurus & Minotaurasaurus', 'Triceratops & Bagaceratops', 'Diplodocus & Brachytrachelopan', 'T.rex & Velociraptor', 1),
(12, 'What animal the Triceratops fossil was thougt to be at first ?', '', 'Bull', 'Goat', 'Elephant', 'Bison', 4),
(13, 'What was the average wingspan of a Microraptor ?', '', '63 cm', '91 cm', '45 cm', '74 cm', 2),
(14, 'What was the lifespan of a T.Rex ?', '', '40-50 Years', '10-20 Years', '30-40 Years', '20-30 Years', 3),
(15, 'What is the average size of a Megalosaurus ?', '', '6 m', '10 m', '8 m', '13 m', 1),
(16, 'What is the largest known dinosaur species?', '', 'Tyrannosaurus rex', 'Brachiosaurus', 'Stegosaurus', 'Velociraptor', 2),
(17, 'Which period did the Tyrannosaurus rex live in?', '', 'Triassic', 'Jurassic', 'Cretaceous', 'Paleogene', 3),
(18, 'What is the meaning of the name \'Velociraptor\'?', '', 'Swift hunter', 'Fierce lizard', 'Fast runner', 'Clever predator', 1),
(19, 'Which dinosaur is known for its long neck?', '', 'Triceratops', 'Allosaurus', 'Brachiosaurus', 'Ankylosaurus', 3),
(20, 'What is the nickname for the Stegosaurus due to its distinctive plates?', '', 'Plated warrior', 'Spiked sentinel', 'Armored guardian', 'Platesaurus', 2),
(21, 'Which dinosaur is considered a flying reptile rather than a true dinosaur?', '', 'Pteranodon', 'Velociraptor', 'Brachiosaurus', 'Triceratops', 1),
(22, 'In what modern-day country were the first dinosaur fossils discovered?', '', 'United States', 'China', 'Argentina', 'England', 4),
(23, 'What is the term for the study of fossils, including dinosaurs?', '', 'Archaeology', 'Geology', 'Biology', 'Paleontology', 4),
(24, 'Which dinosaur is known for its bony crest on its head?', '', 'Parasaurolophus', 'Dilophosaurus', 'Carnotaurus', 'Spinosaurus', 1),
(25, 'How did most dinosaurs become extinct?', '', 'Climate change', 'Volcanic activity', 'A quick change int the athmosphere', 'Disease outbreak', 3),
(26, 'What dinosaur is often associated with having three horns on its face?', '', 'Styracosaurus', 'Triceratops', 'Protoceratops', 'Ceratosaurus', 2),
(27, 'Which dinosaur is known for its domed skull and thick bony frill?', '', 'Pachycephalosaurus', 'Dilophosaurus', 'Carnotaurus', 'Parasaurolophus', 1),
(28, 'What is the smallest known dinosaur species?', '', 'Velociraptor', 'Compsognathus', 'Microraptor', 'Parvicursor', 2),
(29, 'Which dinosaur is often depicted as the main antagonist in the Jurassic Park franchise?', '', 'Velociraptor', 'Tyrannosaurus rex', 'Spinosaurus', 'Indominus rex', 2),
(30, 'What dinosaur is known for its sail-like structure on its back?', '', 'Stegosaurus', 'Dimetrodon', 'Carnotaurus', 'Spinosaurus', 2),
(31, 'Which dinosaur is known for its horned frill and is often called the \'horned face\'?', 'Dinosaur Characteristics', 'Styracosaurus', 'Triceratops', 'Protoceratops', 'Ceratosaurus', 2),
(32, 'What is the term for a group of dinosaurs traveling together?', 'Dinosaur Behavior', 'Pack', 'Herd', 'Flock', 'Swarm', 2),
(33, 'Which dinosaur had a long, whip-like tail with a bony club at the end?', 'Dinosaur Features', 'Allosaurus', 'Ankylosaurus', 'Stegosaurus', 'Velociraptor', 2),
(34, 'What is the name of the dinosaur that is often considered the largest meat-eating dinosaur?', 'Dinosaur Diet', 'Spinosaurus', 'Tyrannosaurus rex', 'Allosaurus', 'Carcharodontosaurus', 1),
(35, 'Which dinosaur is known for its powerful bite force and serrated teeth?', 'Dinosaur Features', 'Allosaurus', 'Tyrannosaurus rex', 'Spinosaurus', 'Velociraptor', 2),
(36, 'What is the term for the process of fossilization where minerals replace the organic material?', 'Paleontology', 'Permineralization', 'Petrification', 'Decomposition', 'Fossilization', 1),
(37, 'Which dinosaur is often considered the fastest runner?', 'Dinosaur Speed', 'Velociraptor', 'Gallimimus', 'Deinonychus', 'Oviraptor', 2),
(38, 'What is the primary evidence that suggests birds are descendants of dinosaurs?', 'Dinosaur Evolution', 'Feathers', 'Beaks', 'Eggs', 'Wings', 1),
(39, 'Which dinosaur is known for its long, sharp claws and is believed to be a skilled predator?', 'Dinosaur Features', 'Deinonychus', 'Troodon', 'Oviraptor', 'Microraptor', 1),
(40, 'What is the name of the supercontinent that existed during the Mesozoic Era?', 'Geological Time', 'Pangaea', 'Laurasia', 'Gondwana', 'Rodinia', 1),
(41, 'Which dinosaur is famous for its massive size and long, tapering tail?', 'Dinosaur Characteristics', 'Apatosaurus', 'Diplodocus', 'Argentinosaurus', 'Mamenchisaurus', 3),
(42, 'In what era did the first dinosaurs appear?', 'Geological Time', 'Paleozoic', 'Mesozoic', 'Cenozoic', 'Precambrian', 2),
(43, 'Which dinosaur is known for its elaborate head crest and is often depicted with a fan-like display?', 'Dinosaur Characteristics', 'Parasaurolophus', 'Corythosaurus', 'Lambeosaurus', 'Edmontosaurus', 1),
(44, 'What is the term for the study of ancient climates based on geological evidence?', 'Paleontology', 'Paleonclimatology', 'Climatopaleology', 'Geology', 'Anthropology', 1),
(45, 'Which dinosaur is often associated with the nickname \'duck-billed\' due to its broad, flattened snout?', 'Dinosaur Characteristics', 'Edmontosaurus', 'Maiasaura', 'Parasaurolophus', 'Corythosaurus', 2),
(46, 'What is the name of the first dinosaur fossil ever discovered?', 'Dinosaur Discovery', 'Megalosaurus', 'Iguanodon', 'Hylaeosaurus', 'Plateosaurus', 1),
(47, 'Which dinosaur is known for its long, slender body and neck, and is often called the `\'riverbank predator\'?', 'Dinosaur Characteristics', 'Suchomimus', 'Baryonyx', 'Spinosaurus', 'Carcharodontosaurus', 2),
(48, 'What is the term for the process of dating fossils and rocks based on the decay of radioactive isotopes?', 'Paleontology', 'Carbon Dating', 'Stratigraphy', 'Paleomagnetism', 'Radiometric Dating', 4),
(49, 'Which dinosaur is known for its distinctive, sail-like structure on its back?', 'Dinosaur Features', 'Dimetrodon', 'Stegosaurus', 'Spinosaurus', 'Carnotaurus', 2),
(50, 'What is the name of the smallest bone in a dinosaur\'s body?', 'Dinosaur Anatomy', 'Femur', 'Tibia', 'Vertebra', 'Stapes', 4),
(51, 'Which dinosaur is believed to have been primarily a herbivore but had sharp, slicing teeth for defense?', 'Dinosaur Diet', 'Stegosaurus', 'Triceratops', 'Allosaurus', 'Iguanodon', 4),
(52, 'What is the term for a group of related dinosaurs that share common characteristics?', 'Dinosaur Taxonomy', 'Order', 'Family', 'Genus', 'Species', 3),
(53, 'Which dinosaur is known for its armored plates and spiked tail, often used for defense against predators?', 'Dinosaur Features', 'Ankylosaurus', 'Stegosaurus', 'Triceratops', 'Kentrosaurus', 1),
(54, 'What is the term for the process of determining the age of rocks and fossils based on their position in rock layers?', 'Paleontology', 'Radiometric Dating', 'Paleontology', 'Sedimentology', 'Stratigraphy', 1),
(55, 'Which dinosaur is believed to have been the largest flying animal ever, with a wingspan of over 30 feet?', 'Dinosaur Size', 'Quetzalcoatlus', 'Pteranodon', 'Dimorphodon', 'Rhamphorhynchus', 1),
(56, 'What is the name of the dinosaur that is often considered the smallest known carnivorous dinosaur?', 'Dinosaur Size', 'Microraptor', 'Compsognathus', 'Velociraptor', 'Parvicursor', 4),
(57, 'Which dinosaur is known for its large, blade-like teeth and is often considered a marine reptile rather than a dinosaur?', 'Dinosaur Classification', 'Plesiosaurus', 'Mosasaurus', 'Elasmosaurus', 'Ichthyosaurus', 2),
(58, 'What is the term for the process of preserving soft tissues in fossils, such as skin or feathers?', 'Paleontology', 'Mineralization', 'Carbonization', 'Lithification', 'Exceptional Preservation', 4),
(59, 'Which dinosaur is known for its long, flexible tail and is often depicted with a bony club at the end?', 'Dinosaur Features', 'Ankylosaurus', 'Stegosaurus', 'Euoplocephalus', 'Nodosaurus', 3),
(60, 'What is the name of the dinosaur that is often considered the largest herbivorous dinosaur?', 'Dinosaur Size', 'Argentinosaurus', 'Apatosaurus', 'Brachiosaurus', 'Diplodocus', 1),
(61, 'Which dinosaur is known for its unusual, elongated snout and is believed to have lived near water?', 'Dinosaur Characteristics', 'Suchomimus', 'Baryonyx', 'Spinosaurus', 'Carcharodontosaurus', 2),
(62, 'What is the term for the process of fossilization where an organism leaves an impression in the surrounding sediment?', 'Paleontology', 'Imprint Fossilization', 'Trace Fossilization', 'Mold Fossilization', 'Cast Fossilization', 1),
(63, 'Which dinosaur is known for its elaborate, bony crest on its nose and is often called the \'unicorn dinosaur\'?', 'Dinosaur Characteristics', 'Styracosaurus', 'Protoceratops', 'Centrosaurus', 'Einiosaurus', 1),
(64, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with feathers?', 'Dinosaur Size', 'Microraptor', 'Archaeopteryx', 'Sinosauropteryx', 'Yi', 1),
(65, 'Which dinosaur is known for its long, slender body and neck, and is often depicted with a crest on its head?', 'Dinosaur Characteristics', 'Dilophosaurus', 'Parasaurolophus', 'Corythosaurus', 'Lambeosaurus', 2),
(66, 'What is the term for the study of ancient life based on fossilized remains?', 'Paleontology', 'Anthropology', 'Archaeology', 'Geology', 'Paleontology', 4),
(67, 'Which dinosaur is known for its large, bony frill and is often depicted with spikes on its tail?', 'Dinosaur Features', 'Triceratops', 'Styracosaurus', 'Protoceratops', 'Ceratosaurus', 1),
(68, 'What is the name of the first dinosaur discovered with evidence of feathers?', 'Dinosaur Evolution', 'Archaeopteryx', 'Microraptor', 'Sinosauropteryx', 'Yi', 1),
(69, 'Which dinosaur is known for its massive, bony head and is often considered the \'king of the tyrant lizards\'?', 'Dinosaur Characteristics', 'Tyrannosaurus rex', 'Giganotosaurus', 'Tarbosaurus', 'Daspletosaurus', 1),
(70, 'What is the term for the process of fossilization where organic material is replaced by minerals, preserving the original structure?', 'Paleontology', 'Permineralization', 'Decomposition', 'Mineralization', 'Petrification', 4),
(71, 'Which dinosaur is known for its long, curved claws and is believed to have been a tree-climber?', 'Dinosaur Features', 'Deinonychus', 'Troodon', 'Oviraptor', 'Microraptor', 1),
(72, 'What is the name of the dinosaur that is often considered the largest known flying reptile?', 'Dinosaur Size', 'Quetzalcoatlus', 'Pteranodon', 'Dimorphodon', 'Rhamphorhynchus', 1),
(73, 'Which dinosaur is known for its distinctive, bony crest on its head and is often depicted with a fan-like display?', 'Dinosaur Characteristics', 'Parasaurolophus', 'Corythosaurus', 'Lambeosaurus', 'Edmontosaurus', 1),
(74, 'What is the term for the process of fossilization where an organism is encased in amber, preserving its soft tissues?', 'Paleontology', 'Amberization', 'Lithification', 'Carbonization', 'Exceptional Preservation', 1),
(75, 'Which dinosaur is known for its long, sharp claws and is believed to have been a swift and agile predator?', 'Dinosaur Features', 'Deinonychus', 'Troodon', 'Oviraptor', 'Microraptor', 1),
(76, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a beak?', 'Dinosaur Size', 'Microraptor', 'Archaeopteryx', 'Sinosauropteryx', 'Yi', 2),
(77, 'Which dinosaur is believed to have had a venomous bite, based on the structure of its teeth and skull?', 'Dinosaur Features', 'Dilophosaurus', 'Troodon', 'Oviraptor', 'Microraptor', 1),
(78, 'What is the term for the process of fossilization where an organism\'s organic material is replaced by water-soluble minerals?', 'Paleontology', 'Leaching', 'Lithification', 'Mineralization', 'Leaching', 1),
(79, 'Which dinosaur is known for its large, bony crest on its head and is often considered a herbivore with a unique feeding strategy?', 'Dinosaur Characteristics', 'Parasaurolophus', 'Corythosaurus', 'Lambeosaurus', 'Edmontosaurus', 1),
(80, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a frill?', 'Dinosaur Size', 'Protoceratops', 'Microceratus', 'Yi', 'Leaellynasaura', 2),
(81, 'Which dinosaur is known for its long, slender body and is often considered a relative of the velociraptor?', 'Dinosaur Classification', 'Deinonychus', 'Troodon', 'Oviraptor', 'Microraptor', 1),
(82, 'What is the term for the process of fossilization where an organism\'s soft tissues are preserved as a thin layer of carbon?', 'Paleontology', 'Mineralization', 'Petrification', 'Lithification', 'Carbonization', 1),
(83, 'Which dinosaur is believed to have been a social animal, based on evidence of fossils found in groups?', 'Dinosaur Behavior', 'Stegosaurus', 'Triceratops', 'Allosaurus', 'Iguanodon', 2),
(84, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a sail-like structure on its back?', 'Dinosaur Size', 'Dimorphodon', 'Rhamphorhynchus', 'Pteranodon', 'Nyctosaurus', 1),
(85, 'Which dinosaur is known for its long, curved neck and is often considered a type of sauropod?', 'Dinosaur Characteristics', 'Brachiosaurus', 'Diplodocus', 'Apatosaurus', 'Argentinosaurus', 2),
(86, 'What is the term for the process of fossilization where an organism\'s original material is replaced by silica, chert, or opal?', 'Paleontology', 'Silicification', 'Mineralization', 'Petrification', 'Lithification', 1),
(87, 'Which dinosaur is believed to have been a scavenger rather than an active predator, based on its anatomy?', 'Dinosaur Behavior', 'Tyrannosaurus rex', 'Spinosaurus', 'Allosaurus', 'Carcharodontosaurus', 1),
(88, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a horned frill?', 'Dinosaur Size', 'Microceratus', 'Protoceratops', 'Yi', 'Leaellynasaura', 2),
(89, 'Which dinosaur is known for its long, sharp tail spikes and is often considered a type of stegosaur?', 'Dinosaur Characteristics', 'Stegosaurus', 'Kentrosaurus', 'Wuerhosaurus', 'Spinosaurus', 2),
(90, 'Which dinosaur is known for its massive, hammer-like tail and is often considered a type of ankylosaur?', 'Dinosaur Characteristics', 'Ankylosaurus', 'Nodosaurus', 'Euoplocephalus', 'Minmi', 1),
(91, 'What is the term for the study of dinosaur footprints and trackways?', 'Paleontology', 'Paleontology', 'Ichthyology', 'Osteology', 'Ichnology', 4),
(92, 'Which dinosaur is known for its long, serrated teeth and is often considered a relative of the T.Rex?', 'Dinosaur Classification', 'Giganotosaurus', 'Carcharodontosaurus', 'Daspletosaurus', 'Tarbosaurus', 2),
(93, 'What is the term for the process of fossilization where an organism\'s bones are replaced with minerals, creating a detailed replica?', 'Paleontology', 'Mineralization', 'Mummification', 'Petrification', 'Mineralization', 1),
(94, 'Which dinosaur is believed to have been a filter feeder, using its comb-like teeth to strain small aquatic organisms?', 'Dinosaur Diet', 'Parasaurolophus', 'Corythosaurus', 'Lambeosaurus', 'Edmontosaurus', 2),
(95, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, slender body?', 'Dinosaur Size', 'Microceratus', 'Compsognathus', 'Yi', 'Leaellynasaura', 2),
(96, 'Which dinosaur is known for its thick, bony armor and is often considered a tank-like herbivore?', 'Dinosaur Characteristics', 'Stegosaurus', 'Ankylosaurus', 'Triceratops', 'Kentrosaurus', 2),
(97, 'What is the term for the process of fossilization where an organism\'s original material is replaced by minerals, preserving the fine details?', 'Paleontology', 'Permineralization', 'Petrification', 'Impression', 'Mineralization', 1),
(98, 'Which dinosaur is believed to have been a nocturnal hunter, based on its large eyes and other anatomical features?', 'Dinosaur Behavior', 'Tyrannosaurus rex', 'Velociraptor', 'Deinonychus', 'Troodon', 4),
(99, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, stiff tail?', 'Dinosaur Size', 'Compsognathus', 'Microraptor', 'Sinosauropteryx', 'Yi', 1),
(100, 'Which dinosaur is known for its long, flexible neck and is often considered a type of therizinosaur?', 'Dinosaur Characteristics', 'Therizinosaurus', 'Deinocheirus', 'Erlikosaurus', 'Segnosaurus', 1),
(101, 'What is the term for the process of fossilization where an organism\'s remains are preserved in ice, preventing decay?', 'Paleontology', 'Refrigeration', 'Freezing', 'Permafrost Preservation', 'Ice Fossilization', 3),
(102, 'Which dinosaur is believed to have been an herbivore with a shovel-like beak, used for scooping vegetation?', 'Dinosaur Diet', 'Edmontosaurus', 'Maiasaura', 'Parasaurolophus', 'Corythosaurus', 4),
(103, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, feathered tail?', 'Dinosaur Size', 'Microraptor', 'Compsognathus', 'Yi', 'Leaellynasaura', 1),
(104, 'Which dinosaur is known for its long, slender body and is often considered a type of allosaur?', 'Dinosaur Classification', 'Allosaurus', 'Carcharodontosaurus', 'Giganotosaurus', 'Spinosaurus', 1),
(105, 'What is the term for the process of fossilization where an organism\'s bones are partially dissolved, leaving a cavity filled with minerals?', 'Paleontology', 'Casting', 'Leaching', 'Dissolution', 'Molding', 2),
(106, 'Which dinosaur is believed to have been a herbivore with a bizarre, sail-like structure on its back?', 'Dinosaur Characteristics', 'Ouranosaurus', 'Spinosaurus', 'Suchomimus', 'Baryonyx', 1),
(107, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a club-like tail?', 'Dinosaur Size', 'Ankylosaurus', 'Stegosaurus', 'Euoplocephalus', 'Nodosaurus', 4),
(108, 'Which dinosaur is known for its long, curved claws and is believed to have been a fish-eater?', 'Dinosaur Features', 'Baryonyx', 'Spinosaurus', 'Suchomimus', 'Carcharodontosaurus', 1),
(109, 'What is the term for the study of dinosaur nests and eggs?', 'Paleontology', 'Oology', 'Ornithology', 'Embryology', 'Nestology', 1),
(110, 'Which dinosaur is believed to have had a complex social structure, based on fossil evidence of herding behavior?', 'Dinosaur Behavior', 'Stegosaurus', 'Triceratops', 'Allosaurus', 'Iguanodon', 3),
(111, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, crooked neck?', 'Dinosaur Size', 'Nqwebasaurus', 'Yi', 'Compsognathus', 'Microraptor', 2),
(112, 'Which dinosaur is known for its large, fan-like tail and is often considered a type of hadrosaur?', 'Dinosaur Characteristics', 'Parasaurolophus', 'Corythosaurus', 'Lambeosaurus', 'Edmontosaurus', 4),
(113, 'What is the term for the process of fossilization where an organism\'s soft tissues are replaced by minerals, preserving the original shape?', 'Paleontology', 'Mineralization', 'Impression', 'Petrification', 'Replacement', 4),
(114, 'Which dinosaur is believed to have been a swift runner with a long, slender body, similar to a cheetah?', 'Dinosaur Speed', 'Velociraptor', 'Gallimimus', 'Deinonychus', 'Oviraptor', 2),
(115, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a sail-like structure on its back?', 'Dinosaur Size', 'Dimorphodon', 'Rhamphorhynchus', 'Pteranodon', 'Nyctosaurus', 1),
(116, 'Which dinosaur is known for its long, curved neck and is often considered a type of sauropod?', 'Dinosaur Characteristics', 'Brachiosaurus', 'Diplodocus', 'Apatosaurus', 'Argentinosaurus', 2),
(117, 'Which dinosaur is known for its unique, bony crest that resembles a helmet and is often considered a type of pachycephalosaur?', 'Dinosaur Characteristics', 'Stygimoloch', 'Homalocephale', 'Dracorex', 'Gigantspinosaurus', 1),
(118, 'What is the term for the process of fossilization where an organism\'s bones are replaced by pyrite, often creating a shiny, metallic appearance?', 'Paleontology', 'Pyritization', 'Mineralization', 'Ferrous Fossilization', 'Sulfurization', 1),
(119, 'Which dinosaur is believed to have been a herbivore with a long, tubular snout for reaching vegetation?', 'Dinosaur Diet', 'Brachiosaurus', 'Camarasaurus', 'Diplodocus', 'Amargasaurus', 3),
(120, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, curved beak?', 'Dinosaur Size', 'Microraptor', 'Compsognathus', 'Yi', 'Leaellynasaura', 2),
(121, 'Which dinosaur is known for its large, sickle-shaped claw on each hind foot and is often considered a type of dromaeosaur?', 'Dinosaur Features', 'Deinonychus', 'Utahraptor', 'Microraptor', 'Velociraptor', 1),
(122, 'What is the term for the process of fossilization where an organism\'s bones are dissolved, leaving only a cavity in the rock?', 'Paleontology', 'Casting', 'Leaching', 'Dissolution', 'Molding', 3),
(123, 'Which dinosaur is believed to have been a filter feeder, using its elongated jaws to strain small organisms from the water?', 'Dinosaur Diet', 'Carnotaurus', 'Spinosaurus', 'Suchomimus', 'Baryonyx', 4),
(124, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, flexible tail?', 'Dinosaur Size', 'Microraptor', 'Compsognathus', 'Yi', 'Leaellynasaura', 1),
(125, 'Which dinosaur is known for its long, flexible neck and is often considered a type of sauropod?', 'Dinosaur Characteristics', 'Brachiosaurus', 'Diplodocus', 'Apatosaurus', 'Argentinosaurus', 2),
(126, 'What is the term for the process of fossilization where an organism\'s bones are replaced by minerals, creating a detailed replica?', 'Paleontology', 'Mineralization', 'Mummification', 'Petrification', 'Mineralization', 1),
(127, 'Which dinosaur is believed to have been a herbivore with a shovel-like beak, used for scooping vegetation?', 'Dinosaur Diet', 'Edmontosaurus', 'Maiasaura', 'Parasaurolophus', 'Corythosaurus', 4),
(128, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, feathered tail?', 'Dinosaur Size', 'Microraptor', 'Compsognathus', 'Yi', 'Leaellynasaura', 1),
(129, 'Which dinosaur is known for its long, curved claws and is believed to have been a fish-eater?', 'Dinosaur Features', 'Baryonyx', 'Spinosaurus', 'Suchomimus', 'Carcharodontosaurus', 1),
(130, 'What is the term for the study of dinosaur nests and eggs?', 'Paleontology', 'Oology', 'Ornithology', 'Embryology', 'Nestology', 1),
(131, 'Which dinosaur is believed to have had a complex social structure, based on fossil evidence of herding behavior?', 'Dinosaur Behavior', 'Stegosaurus', 'Triceratops', 'Allosaurus', 'Iguanodon', 3),
(132, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, crooked neck?', 'Dinosaur Size', 'Nqwebasaurus', 'Yi', 'Compsognathus', 'Microraptor', 2),
(133, 'Which dinosaur is known for its large, fan-like tail and is often considered a type of hadrosaur?', 'Dinosaur Characteristics', 'Parasaurolophus', 'Corythosaurus', 'Lambeosaurus', 'Edmontosaurus', 4),
(134, 'What is the term for the process of fossilization where an organism\'s original material is replaced by minerals, preserving the fine details?', 'Paleontology', 'Permineralization', 'Petrification', 'Impression', 'Mineralization', 1),
(135, 'Which dinosaur is believed to have been a swift runner with a long, slender body, similar to a cheetah?', 'Dinosaur Speed', 'Velociraptor', 'Gallimimus', 'Deinonychus', 'Oviraptor', 2),
(136, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a sail-like structure on its back?', 'Dinosaur Size', 'Dimorphodon', 'Rhamphorhynchus', 'Pteranodon', 'Nyctosaurus', 1),
(137, 'Which dinosaur is known for its long, curved neck and is often considered a type of sauropod?', 'Dinosaur Characteristics', 'Brachiosaurus', 'Diplodocus', 'Apatosaurus', 'Argentinosaurus', 2),
(138, 'What is the term for the process of fossilization where an organism\'s original material is replaced by silica, chert, or opal?', 'Paleontology', 'Silicification', 'Mineralization', 'Petrification', 'Lithification', 1),
(139, 'Which dinosaur is believed to have been a herbivore with a unique, elongated head and rows of teeth for cropping vegetation?', 'Dinosaur Diet', 'Iguanodon', 'Camarasaurus', 'Amargasaurus', 'Ouranosaurus', 1),
(140, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, stiff tail?', 'Dinosaur Size', 'Compsognathus', 'Microraptor', 'Sinosauropteryx', 'Yi', 2),
(141, 'Which dinosaur is known for its large, sickle-shaped claw on each hind foot and is often considered a type of dromaeosaur?', 'Dinosaur Features', 'Deinonychus', 'Utahraptor', 'Microraptor', 'Velociraptor', 1),
(142, 'What is the term for the process of fossilization where an organism\'s bones are dissolved, leaving only a cavity in the rock?', 'Paleontology', 'Casting', 'Leaching', 'Dissolution', 'Molding', 3),
(143, 'Which dinosaur is believed to have been a filter feeder, using its elongated jaws to strain small organisms from the water?', 'Dinosaur Diet', 'Carnotaurus', 'Spinosaurus', 'Suchomimus', 'Baryonyx', 4),
(144, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, flexible tail?', 'Dinosaur Size', 'Microraptor', 'Compsognathus', 'Yi', 'Leaellynasaura', 1),
(145, 'Which dinosaur is known for its long, flexible neck and is often considered a type of sauropod?', 'Dinosaur Characteristics', 'Brachiosaurus', 'Diplodocus', 'Apatosaurus', 'Argentinosaurus', 2),
(146, 'What is the term for the process of fossilization where an organism\'s bones are replaced by minerals, creating a detailed replica?', 'Paleontology', 'Mineralization', 'Mummification', 'Petrification', 'Mineralization', 1),
(147, 'Which dinosaur is believed to have been a herbivore with a shovel-like beak, used for scooping vegetation?', 'Dinosaur Diet', 'Edmontosaurus', 'Maiasaura', 'Parasaurolophus', 'Corythosaurus', 4),
(148, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, feathered tail?', 'Dinosaur Size', 'Microraptor', 'Compsognathus', 'Yi', 'Leaellynasaura', 1),
(149, 'Which dinosaur is known for its long, curved claws and is believed to have been a fish-eater?', 'Dinosaur Features', 'Baryonyx', 'Spinosaurus', 'Suchomimus', 'Carcharodontosaurus', 1),
(150, 'What is the term for the study of dinosaur nests and eggs?', 'Paleontology', 'Oology', 'Ornithology', 'Embryology', 'Nestology', 1),
(151, 'Which dinosaur is believed to have had a complex social structure, based on fossil evidence of herding behavior?', 'Dinosaur Behavior', 'Stegosaurus', 'Triceratops', 'Allosaurus', 'Iguanodon', 3),
(152, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, crooked neck?', 'Dinosaur Size', 'Nqwebasaurus', 'Yi', 'Compsognathus', 'Microraptor', 2),
(153, 'Which dinosaur is known for its large, fan-like tail and is often considered a type of hadrosaur?', 'Dinosaur Characteristics', 'Parasaurolophus', 'Corythosaurus', 'Lambeosaurus', 'Edmontosaurus', 4),
(154, 'What is the term for the process of fossilization where an organism\'s original material is replaced by minerals, preserving the fine details?', 'Paleontology', 'Permineralization', 'Petrification', 'Impression', 'Mineralization', 1),
(155, 'Which dinosaur is believed to have been a swift runner with a long, slender body, similar to a cheetah?', 'Dinosaur Speed', 'Velociraptor', 'Gallimimus', 'Deinonychus', 'Oviraptor', 2),
(156, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a sail-like structure on its back?', 'Dinosaur Size', 'Dimorphodon', 'Rhamphorhynchus', 'Pteranodon', 'Nyctosaurus', 1),
(157, 'Which dinosaur is known for its long, curved neck and is often considered a type of sauropod?', 'Dinosaur Characteristics', 'Brachiosaurus', 'Diplodocus', 'Apatosaurus', 'Argentinosaurus', 2),
(158, 'What is the term for the process of fossilization where an organism\'s original material is replaced by silica, chert, or opal?', 'Paleontology', 'Silicification', 'Mineralization', 'Petrification', 'Lithification', 1),
(159, 'Which dinosaur is believed to have been a herbivore with a unique, elongated head and rows of teeth for cropping vegetation?', 'Dinosaur Diet', 'Iguanodon', 'Camarasaurus', 'Amargasaurus', 'Ouranosaurus', 1),
(160, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, stiff tail?', 'Dinosaur Size', 'Compsognathus', 'Microraptor', 'Sinosauropteryx', 'Yi', 2),
(161, 'Which dinosaur is known for its large, sickle-shaped claw on each hind foot and is often considered a type of dromaeosaur?', 'Dinosaur Features', 'Deinonychus', 'Utahraptor', 'Microraptor', 'Velociraptor', 1),
(162, 'What is the term for the process of fossilization where an organism\'s bones are dissolved, leaving only a cavity in the rock?', 'Paleontology', 'Casting', 'Leaching', 'Dissolution', 'Molding', 3),
(163, 'Which dinosaur is believed to have been a filter feeder, using its elongated jaws to strain small organisms from the water?', 'Dinosaur Diet', 'Carnotaurus', 'Spinosaurus', 'Suchomimus', 'Baryonyx', 4),
(164, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, flexible tail?', 'Dinosaur Size', 'Microraptor', 'Compsognathus', 'Yi', 'Leaellynasaura', 1),
(165, 'Which dinosaur is known for its long, flexible neck and is often considered a type of sauropod?', 'Dinosaur Characteristics', 'Brachiosaurus', 'Diplodocus', 'Apatosaurus', 'Argentinosaurus', 2),
(166, 'What is the term for the process of fossilization where an organism\'s bones are replaced by minerals, creating a detailed replica?', 'Paleontology', 'Mineralization', 'Mummification', 'Petrification', 'Mineralization', 1),
(167, 'Which dinosaur is believed to have been a herbivore with a shovel-like beak, used for scooping vegetation?', 'Dinosaur Diet', 'Edmontosaurus', 'Maiasaura', 'Parasaurolophus', 'Corythosaurus', 4),
(168, 'What is the name of the dinosaur that is often considered the smallest known dinosaur with a long, feathered tail?', 'Dinosaur Size', 'Microraptor', 'Compsognathus', 'Yi', 'Leaellynasaura', 1),
(169, 'Which dinosaur is known for its long, curved claws and is believed to have been a fish-eater?', 'Dinosaur Features', 'Baryonyx', 'Spinosaurus', 'Suchomimus', 'Carcharodontosaurus', 1),
(170, 'What is the term for the study of dinosaur nests and eggs?', 'Paleontology', 'Oology', 'Ornithology', 'Embryology', 'Nestology', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
