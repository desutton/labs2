# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.33)
# Database: fmuser
# Generation Time: 2014-02-07 17:07:42 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;


# Dump of table _activeIngredient
# ------------------------------------------------------------

DROP TABLE IF EXISTS `_activeIngredient`;

CREATE TABLE `_activeIngredient`
(
    `AI_ID`   int(11) unsigned NOT NULL AUTO_INCREMENT,
    `AI_Name` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`AI_ID`)
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1;

LOCK TABLES `_activeIngredient` WRITE;
/*!40000 ALTER TABLE `_activeIngredient`
    DISABLE KEYS */;

INSERT INTO `_activeIngredient` (`AI_ID`, `AI_Name`)
VALUES (0, '--- Choose Ingredient ---'),
       (1, 'Amlodopine Besylate'),
       (2, 'Ammonium Chloride'),
       (3, 'Ammonium Sulfate'),
       (4, 'Amoxicillin'),
       (5, 'Amphotericin B'),
       (6, 'Anastrozole'),
       (7, 'Antipyrine'),
       (8, 'Apomorphine HCl'),
       (9, 'Ascorbic Acid (Vit. C)'),
       (10, 'Asprin'),
       (11, 'Atenolol'),
       (12, 'Atorvastatin Calcium'),
       (13, 'Atropine Sulfate'),
       (14, 'Azithromycin'),
       (15, 'Bacitracin'),
       (16, 'Baclofen'),
       (17, 'Benazepril HCl'),
       (18, 'Benzocaine'),
       (19, 'Betahistine HCl'),
       (20, 'Betamethasone Acetate'),
       (21, 'Betamethasone Sodium Phosphate'),
       (22, 'Bethanechol Chloride Bisacodyl'),
       (23, 'Boldenone Undecylenate'),
       (24, 'Boric Acid'),
       (25, 'Brompheniramine Maleate'),
       (26, 'Budesonide'),
       (27, 'Budrenorphine HCl'),
       (28, 'Bupivacaine HCl'),
       (29, 'Caffeine'),
       (30, 'Calcitriol'),
       (31, 'Calcium Gluconate'),
       (32, 'Calcium Saccharate'),
       (33, 'Carbazochrome'),
       (34, 'Carprofen'),
       (35, 'Cephalexin Hydrate'),
       (36, 'Cetyl Myristoleate'),
       (37, 'Chlorambucil'),
       (38, 'Chloramphenicol Palmitate'),
       (39, 'Chlorhexidine Gluconate'),
       (40, 'Chloroquine Phosphate'),
       (41, 'Chlorpromazine HCl'),
       (42, 'Chlorpheniramine Maleate'),
       (43, 'Chrysin'),
       (44, 'Cimetidine'),
       (45, 'Ciprofloxacin'),
       (46, 'Cisapride'),
       (47, 'Citrinin Mycotoxin (Red Yeast Rice)'),
       (48, 'Clenbuterol'),
       (49, 'Clindamycin'),
       (50, 'Clioquinol'),
       (51, 'Clomipramine HCl'),
       (52, 'Clonidine HCl'),
       (53, 'Clopidogrel Bisulfate (Plavix)'),
       (54, 'Cocaine HCl'),
       (55, 'Colchicine'),
       (56, 'Colistin Sulfate'),
       (57, 'Cortisol'),
       (58, 'Cyanocobalamin (Vit. B12)'),
       (59, 'Cyclobenzaprine HCl'),
       (60, 'Cyclophosphamide'),
       (61, 'Cyclosporine A'),
       (62, 'Cyproheptadine HCl'),
       (63, 'Cysteine'),
       (64, 'Cysteine HCl'),
       (65, 'Cytarabine'),
       (66, 'Deslorelin'),
       (67, 'Dexamethasone'),
       (68, 'Dexamethasone Acetate'),
       (69, 'Dexamethasone Sodium Phosphate'),
       (70, 'Dexpanthenol'),
       (71, 'DHEA (Dehydroepiandoster- one)'),
       (72, '7-Keto-DHEA'),
       (73, 'Diazepam'),
       (74, 'Diclazuril'),
       (75, 'Dicumarol'),
       (76, 'Diethylstilbesterol (DES)'),
       (77, 'Digoxin'),
       (78, 'Dihydrotestosterone'),
       (79, 'Diindolylmethane'),
       (80, 'Dimethyl Sulfone (MSM)'),
       (81, 'Dimethylsulfoxide (DMSO)'),
       (82, 'Diltiazem HCl'),
       (83, 'Diphenhydramine HCl'),
       (84, 'Diphenylcyclopropenone'),
       (85, 'Dipyrone'),
       (86, 'DMPS (2'),
       (88, 'Domperidone'),
       (89, 'Droperidol'),
       (90, 'Ecgonine'),
       (91, 'Edetate Calcium Disodium'),
       (92, 'Edetate Disodium'),
       (93, 'Enrofloxacin'),
       (94, 'Ephedrine'),
       (95, 'Epinephrine Bitartrate'),
       (96, 'Ergoloid Mesylates'),
       (97, 'Erythromycin'),
       (98, 'Estradiol'),
       (99, 'Estradiol Cypionate'),
       (100, 'Estradiol Valerate'),
       (101, 'Estriol'),
       (102, 'Estrone'),
       (103, 'Ethambutol'),
       (104, 'Ethinyl'),
       (105, 'Estradiol'),
       (106, 'Ethyl Pyruvate'),
       (107, 'Etodolac'),
       (108, 'Famciclovir'),
       (109, 'Fenbendazole'),
       (110, 'Fentanyl Citrate'),
       (111, 'Finasteride'),
       (112, 'Fluconazole'),
       (113, '5-Fluorouracil'),
       (114, 'Fluorescein Sodium'),
       (115, 'Fluoxetine HCl'),
       (116, 'Folic Acid'),
       (117, 'Folinic Acid Calcium'),
       (118, 'Formoterol'),
       (119, 'Fumarate'),
       (120, 'Furazolidone'),
       (121, 'Gabapentin'),
       (122, 'Gemfibrozil'),
       (123, 'Gentamicin Sulfate'),
       (124, 'Glipazide'),
       (125, 'Glutathione (Reduced Form) Guaifenesin'),
       (126, 'Haloperidol'),
       (127, 'Histamine Diphosphate'),
       (128, 'Human Chorionic Gonadotropin (HCG)'),
       (129, 'Hyaluronidase'),
       (130, 'Hydrocodone Bitartrate'),
       (131, 'Hydrocortisone'),
       (132, 'Hydrocortisone Acetate'),
       (133, 'Hydromorphone HCl'),
       (134, 'Hydroquinone'),
       (135, 'Hydroxocobalamin (Vit. B12a)'),
       (136, 'Hydroxyprogesterone Caproate'),
       (137, 'Hydroxyurea'),
       (138, 'Hydroxyzine HCl'),
       (139, 'Ibuprofen'),
       (140, 'Idoxuridine'),
       (141, 'Indomethacin'),
       (142, 'Indole-3-Carbinol'),
       (143, 'Insulin'),
       (144, 'Ipratropium Br'),
       (145, 'Isoproterenol HCl'),
       (146, 'Isosorbide Dinitrate'),
       (147, 'Isoxsuprine HCl'),
       (148, 'Itraconazole'),
       (149, 'Ivermectin'),
       (150, 'Ketamine HCl'),
       (151, 'Ketoconazole'),
       (152, 'Ketoprofen'),
       (153, 'Ketorolac Tromethamine'),
       (154, 'Lamotrigine'),
       (155, 'Lansoprazole'),
       (156, 'Leucovoran'),
       (157, 'Levalbuterol HCl'),
       (158, 'Levetiracetam'),
       (159, 'Levothyroxine Sodium (T4)'),
       (160, 'Lidocaine HCl'),
       (161, 'Lincomycin'),
       (162, 'Liothyronine Sodium (T3)'),
       (163, 'a-Lipoic Acid'),
       (164, 'Lomustine'),
       (165, 'Lorazepam'),
       (166, 'Lufenuron'),
       (167, 'Marbofloxacin'),
       (168, 'Magnesium Chloride'),
       (169, 'Magnesium Sulfate'),
       (170, 'Mebendazole'),
       (171, 'Meclizine'),
       (172, 'Medroxyprogesterone Ace- tate'),
       (173, 'Melatonin'),
       (174, 'Melphalan'),
       (175, 'Memantine HCl'),
       (176, 'Meropenem'),
       (177, 'Metformin HCl'),
       (178, 'Methadone HCl'),
       (179, 'Methimazole'),
       (180, 'Methionine'),
       (181, 'Methocarbamol'),
       (182, 'Methotrexate'),
       (183, 'Methylcobalamin'),
       (184, 'Methylprednisolone Acetate'),
       (185, 'Methyltestosterone'),
       (186, 'Methysergide'),
       (187, 'Maleate'),
       (188, 'Metoclopramide HCl'),
       (189, 'Metronidazole'),
       (190, 'Metronidazole Benzoate'),
       (191, 'Metoprolol Tartrate'),
       (192, 'Miconazole'),
       (193, 'Milbemycin Oxime'),
       (194, 'Minoxidil'),
       (195, 'Mirtazapine'),
       (196, 'Misoprostol'),
       (197, 'Mometasone Furoate'),
       (198, 'Monosodium Glutamate'),
       (199, 'Monosodium Aspartate'),
       (200, 'Morphine Sulfate'),
       (201, 'Mupirocin'),
       (202, 'Naloxone HCl'),
       (203, 'Naltrexone HCl'),
       (204, 'Nandrolone Decanoate'),
       (205, 'Neomycin'),
       (206, 'Niacin'),
       (207, 'Niacinamide'),
       (208, 'Nicotinamide'),
       (209, 'ß-Nicotinamide Adenine Dinucleotide'),
       (210, 'Nifedipine'),
       (211, 'Nitrofurazone'),
       (212, 'Octinoxate'),
       (213, 'Octisalate'),
       (214, 'Omeprazole'),
       (215, 'Orphenadrine Citrate Osalazine Sodium'),
       (216, 'Oxybenzone Oxybutynin Chloride'),
       (217, 'Oxycodone HCl'),
       (218, 'Oxymetazoline HCl'),
       (219, 'Oxytocin'),
       (220, 'Papaverine HCl'),
       (221, 'Paroxetine HCl'),
       (222, 'Penicillamine'),
       (223, 'Pentoxifylline'),
       (224, 'Pergolide Mesylate'),
       (225, 'Phenobarbital'),
       (226, 'Phenol'),
       (227, 'Phentermine HCl'),
       (228, 'Phentolamine Mesylate'),
       (229, 'Phenoxybenzamine HCl'),
       (230, 'Phenylephrine HCl'),
       (231, 'Phenytoin Sodium'),
       (232, 'Phosphatidylcholine'),
       (233, 'Phytonadione (Vit. K1)'),
       (234, 'Pilocarpine Nitrate'),
       (235, 'Pimobendan'),
       (236, 'Piroxicam'),
       (237, 'Polyhexamethylene Bigua- nide'),
       (238, 'Polymyxin B Sulfate'),
       (239, 'Potassium Bromide'),
       (240, 'Potassium Chloride'),
       (241, 'Potassium Citrate'),
       (242, 'Potassium Clavulanate'),
       (243, 'Potassium Phosphates'),
       (244, 'Praziquantel'),
       (245, 'Prazosin HCl'),
       (246, 'Prednisolone'),
       (247, 'Prednisolone Acetate'),
       (248, 'Prednisone'),
       (249, 'Pregnenolone'),
       (250, 'Prilocaine HCl'),
       (251, 'Procainamide HCl'),
       (252, 'Procarbazine HCl'),
       (253, 'Prochlorperazine Edisylate'),
       (254, 'Progesterone'),
       (255, 'Promethazine HCl'),
       (256, 'Propantheline Bromide'),
       (257, 'Prostaglandin E1'),
       (258, 'Pseudoephedrine'),
       (259, 'Pyrantel Pamoate'),
       (260, 'Pyridostigmine Bromide'),
       (261, 'Pyrimethamine'),
       (262, 'Pyridoxine HCl (Vit. B6) PZI Insulin'),
       (263, 'Quetiapine'),
       (264, 'Quinacrine HCl'),
       (265, 'Quinine Sulfate'),
       (266, 'Ranitidine HCl'),
       (267, 'Riboflavin (Vit B2)'),
       (268, 'Rifampin Ronidazol'),
       (269, 'Rutin'),
       (270, 'Salicylic Acid'),
       (271, 'Scopolamine HBr'),
       (272, 'Selegiline HCl'),
       (273, 'Sermorelin'),
       (274, 'Sildenafil Citrate (Viagra)'),
       (275, 'Sodium Chloride'),
       (276, 'Sodium Iodide'),
       (277, 'Sodium Benzoate'),
       (278, 'Sodium Phosphates'),
       (279, 'Sodium Salicylate'),
       (280, 'Somatropin'),
       (281, 'Spironolactone'),
       (282, 'Stanozolol'),
       (283, 'Sufentanil Citrate'),
       (284, 'Sulfadiazine'),
       (285, 'Sulfanilamide'),
       (286, 'Sulfapyridine'),
       (287, 'Sulfasalazine'),
       (288, 'Tacrolimus'),
       (289, 'Tadalafil'),
       (290, 'Testosterone'),
       (291, 'Testosterone Cypionate'),
       (292, 'Testosterone Decanoate'),
       (293, 'Testosterone Enanthate'),
       (294, 'Testosterone Isocaproate'),
       (295, 'Testosterone Propionate'),
       (296, 'Tetracaine (Base)'),
       (297, 'Tetracaine HCl'),
       (298, 'Tetracycline HCl'),
       (299, 'Theophylline'),
       (300, 'Thiamine HCl'),
       (301, 'Thymol'),
       (302, 'Tobramycin Sulfate'),
       (303, 'Toltrazuril'),
       (304, 'Tramadol'),
       (305, 'Tretinoin (Retinoic Acid)'),
       (306, 'Triamcinolone Acetonide'),
       (307, 'Triamcinolone Diacetate'),
       (308, 'Trilostane'),
       (309, 'Trimeprazine'),
       (310, 'Tartrate'),
       (311, 'Tylosin'),
       (312, 'Tartrate'),
       (313, 'Urea'),
       (314, 'Ursodiol'),
       (315, 'Vancomycin'),
       (316, 'Vardenafil'),
       (317, 'Verapamil HCl'),
       (318, 'Vitamin A Palmitate'),
       (319, 'Vitamin E Acetate'),
       (320, 'Vitamin E Succinate'),
       (321, 'Vitamin D3'),
       (322, 'Yohimbine'),
       (323, 'Ziconotide'),
       (324, 'Zinc Oxide'),
       (325, 'Imiquimod');

/*!40000 ALTER TABLE `_activeIngredient`
    ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table _labReport
# ------------------------------------------------------------

DROP TABLE IF EXISTS `_labReport`;

CREATE TABLE `_labReport`
(
    `lr_id`                                  int(11) unsigned NOT NULL AUTO_INCREMENT,
    `lr_MethodID`                            varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_TrackingDesignation`                 varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_ActiveIngrediant`                    varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_AIConcentration`                     varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_Potency`                             varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_DateOfTest`                          date                                  DEFAULT NULL,
    `lr_Comments`                            text COLLATE utf32_unicode_ci,
    `lr_TrackingDesignation_Endotoxin`       varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_TrackingDesignation_PrelimSterility` varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_TrackingDesignation_FinalSterility`  varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_TrackingDesignation_FungiSterility`  varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_EndoTestStart`                       date                                  DEFAULT NULL,
    `lr_EndoTestEnd`                         date                                  DEFAULT NULL,
    `lr_EndoMediaInfoAlphaNumber`            varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_EndoMediaInfoDate`                   date                                  DEFAULT NULL,
    `lr_EndoUSPLimits`                       varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_EndoTemp`                            varchar(5) COLLATE utf32_unicode_ci   DEFAULT NULL,
    `lr_EndoResults`                         varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_EndoComments`                        text COLLATE utf32_unicode_ci,
    `lr_PrelimTestStart`                     date                                  DEFAULT NULL,
    `lr_PrelimTestEnd`                       date                                  DEFAULT NULL,
    `lr_PrelimDatesChecked`                  varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_PrelimTemp`                          varchar(5) COLLATE utf32_unicode_ci   DEFAULT NULL,
    `lr_PrelimResults`                       varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_PrelimComments`                      text COLLATE utf32_unicode_ci,
    `lr_FinalTestStart`                      date                                  DEFAULT NULL,
    `lr_FinalTestEnd`                        date                                  DEFAULT NULL,
    `lr_FinalDatesChecked`                   varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_FinalTemp`                           varchar(5) COLLATE utf32_unicode_ci   DEFAULT NULL,
    `lr_FinalResults`                        varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_FinalComments`                       text COLLATE utf32_unicode_ci,
    `lr_FinalMediaInfoAlphaNumber`           varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_FinalMediaInfoDate`                  date                                  DEFAULT NULL,
    `lr_FungiTestStart`                      date                                  DEFAULT NULL,
    `lr_FungiTestEnd`                        date                                  DEFAULT NULL,
    `lr_FungiDatesChecked`                   varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_FungiTemp`                           varchar(5) COLLATE utf32_unicode_ci   DEFAULT NULL,
    `lr_FungiResults`                        varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_FungiComments`                       text COLLATE utf32_unicode_ci,
    `lr_FungiMediaInfoAlphaNumber`           varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_FungiMediaInfoDate`                  date                                  DEFAULT NULL,
    `lr_tabID`                               varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_AIMethodAmount`                      varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_ReporterPerson`                      varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_ReporterPersonEntry`                 varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `lr_methodAIStatus`                      varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`lr_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf32
  COLLATE = utf32_unicode_ci;

LOCK TABLES `_labReport` WRITE;
/*!40000 ALTER TABLE `_labReport`
    DISABLE KEYS */;

INSERT INTO `_labReport` (`lr_id`, `lr_MethodID`, `lr_TrackingDesignation`, `lr_ActiveIngrediant`, `lr_AIConcentration`,
                          `lr_Potency`, `lr_DateOfTest`, `lr_Comments`, `lr_TrackingDesignation_Endotoxin`,
                          `lr_TrackingDesignation_PrelimSterility`, `lr_TrackingDesignation_FinalSterility`,
                          `lr_TrackingDesignation_FungiSterility`, `lr_EndoTestStart`, `lr_EndoTestEnd`,
                          `lr_EndoMediaInfoAlphaNumber`, `lr_EndoMediaInfoDate`, `lr_EndoUSPLimits`, `lr_EndoTemp`,
                          `lr_EndoResults`, `lr_EndoComments`, `lr_PrelimTestStart`, `lr_PrelimTestEnd`,
                          `lr_PrelimDatesChecked`, `lr_PrelimTemp`, `lr_PrelimResults`, `lr_PrelimComments`,
                          `lr_FinalTestStart`, `lr_FinalTestEnd`, `lr_FinalDatesChecked`, `lr_FinalTemp`,
                          `lr_FinalResults`, `lr_FinalComments`, `lr_FinalMediaInfoAlphaNumber`,
                          `lr_FinalMediaInfoDate`, `lr_FungiTestStart`, `lr_FungiTestEnd`, `lr_FungiDatesChecked`,
                          `lr_FungiTemp`, `lr_FungiResults`, `lr_FungiComments`, `lr_FungiMediaInfoAlphaNumber`,
                          `lr_FungiMediaInfoDate`, `lr_tabID`, `lr_AIMethodAmount`, `lr_ReporterPerson`,
                          `lr_ReporterPersonEntry`, `lr_methodAIStatus`)
VALUES (8, '3', 'Be 3 25',
        'Cimetidine\rIbuprofen\rDexamethasone\rImiquimod\rLidocaine HCl\rRanitidine HCl\r5-Fluorouracil',
        '4.96\r4.84\r.988\r4.51\r5.12\r4.77\r-', '99.2\r96.8\r98.8\r90.2\r102.4\r77.0\r-', '2013-11-20',
        'Cimetidine, DDG, Ibuprofen, Imiquimod, and Lidocaine meet USP potency requirements.\rRentioic Acid is below USP range.\rTea Tree Oil cannot be tested at this time.',
        'Be 3 25', 'Be 3 25', 'Be 3 25', 'Be 3 25', NULL, NULL, NULL, NULL, NULL, NULL, NULL,
        'No clot formation in assay vial\rMeets USP requirements', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
        NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5\r5\r1\r5\r5\r5\r1',
        'David Sutton', NULL, 'P'),
       (9, '10', 'Be 3 37', 'Colchicine', '349', '99.99%', '2013-11-22', 'Meets potency requir.', 'Be 3 37', 'Be 3 37',
        'Be 3 37', 'Be 3 37', NULL, NULL, NULL, NULL, NULL, NULL, NULL,
        'No clot formation in assay vial\rMeets USP requirements', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
        NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '350', 'David Sutton', NULL,
        'P');

/*!40000 ALTER TABLE `_labReport`
    ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table _stabilityStudy
# ------------------------------------------------------------

DROP TABLE IF EXISTS `_stabilityStudy`;

CREATE TABLE `_stabilityStudy`
(
    `sb_id`                 int(11) unsigned NOT NULL AUTO_INCREMENT,
    `sb_methodID`           varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `sb_TestingSchedule`    date                                  DEFAULT NULL,
    `sb_DateofTest`         date                                  DEFAULT NULL,
    `sb_ConcentrationFound` varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `sb_PotencyFound`       varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `sb_Comments`           text COLLATE utf32_unicode_ci,
    `sb_DateReported`       date                                  DEFAULT NULL,
    PRIMARY KEY (`sb_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf32
  COLLATE = utf32_unicode_ci;

LOCK TABLES `_stabilityStudy` WRITE;
/*!40000 ALTER TABLE `_stabilityStudy`
    DISABLE KEYS */;

INSERT INTO `_stabilityStudy` (`sb_id`, `sb_methodID`, `sb_TestingSchedule`, `sb_DateofTest`, `sb_ConcentrationFound`,
                               `sb_PotencyFound`, `sb_Comments`, `sb_DateReported`)
VALUES (1, 'M121506431', '2013-11-21', '2013-11-21', '999', '.999', 'test', '2013-11-21');

/*!40000 ALTER TABLE `_stabilityStudy`
    ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table _sterilityReport
# ------------------------------------------------------------

DROP TABLE IF EXISTS `_sterilityReport`;

CREATE TABLE `_sterilityReport`
(
    `sr_id`                  int(11) unsigned NOT NULL AUTO_INCREMENT,
    `sr_reportID`            int(11)      DEFAULT NULL,
    `sr_methodID`            varchar(255) DEFAULT NULL,
    `sr_TrackingDesignation` varchar(255) DEFAULT NULL,
    `sr_ActiveIngrediant`    varchar(255) DEFAULT NULL,
    `sr_AIConcentration`     varchar(255) DEFAULT NULL,
    `sr_DateOfTest`          date         DEFAULT NULL,
    `sr_Organism`            varchar(255) DEFAULT NULL,
    `sr_OrganismLot`         varchar(255) DEFAULT NULL,
    `sr_Comments`            text,
    `sr_Reporter`            varchar(255) DEFAULT NULL,
    PRIMARY KEY (`sr_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1;



# Dump of table custody
# ------------------------------------------------------------

DROP TABLE IF EXISTS `custody`;

CREATE TABLE `custody`
(
    `id`                   int(11) unsigned NOT NULL AUTO_INCREMENT,
    `methodTrackingNumber` varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `methodID`             int(10)                               DEFAULT NULL,
    `Shipper`              varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `ShipperCondition`     varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `ShipperPerson`        varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `ShipperTime`          datetime                              DEFAULT NULL,
    `ShipperTemp`          varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `LoginPerson`          varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `LoginTime`            datetime                              DEFAULT NULL,
    `LoginStore`           varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `Status`               varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf32
  COLLATE = utf32_unicode_ci;

LOCK TABLES `custody` WRITE;
/*!40000 ALTER TABLE `custody`
    DISABLE KEYS */;

INSERT INTO `custody` (`id`, `methodTrackingNumber`, `methodID`, `Shipper`, `ShipperCondition`, `ShipperPerson`,
                       `ShipperTime`, `ShipperTemp`, `LoginPerson`, `LoginTime`, `LoginStore`, `Status`)
VALUES (4, NULL, 3, NULL, NULL, NULL, NULL, NULL, 'David Sutton', '2013-11-20 15:33:28', NULL, 'In'),
       (5, 'Be 3 25', 3, 'FedEx', 'Good', 'Dave', '2013-11-20 15:34:34', 'Cool', 'David Sutton', '2013-11-20 15:34:08',
        'Room Temp', 'In'),
       (6, 'Be 3 37', 10, 'FedEx', 'Broken', 'DaveS', '2013-11-22 14:03:44', 'Room Temp', 'David Sutton',
        '2013-11-22 14:03:23', 'Frozen', 'In');

/*!40000 ALTER TABLE `custody`
    ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table custodyLog
# ------------------------------------------------------------

DROP TABLE IF EXISTS `custodyLog`;

CREATE TABLE `custodyLog`
(
    `id`                   int(11) unsigned NOT NULL AUTO_INCREMENT,
    `methodTrackingNumber` varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `methodID`             int(10)                               DEFAULT NULL,
    `RemovedPerson`        varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `RemovedFrom`          varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `RemovedTime`          datetime                              DEFAULT NULL,
    `RemovedTestType`      varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `ReturnPerson`         varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `ReturnTo`             varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `ReturnTime`           datetime                              DEFAULT NULL,
    `Status`               varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `CurrentStatus`        varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf32
  COLLATE = utf32_unicode_ci;

LOCK TABLES `custodyLog` WRITE;
/*!40000 ALTER TABLE `custodyLog`
    DISABLE KEYS */;

INSERT INTO `custodyLog` (`id`, `methodTrackingNumber`, `methodID`, `RemovedPerson`, `RemovedFrom`, `RemovedTime`,
                          `RemovedTestType`, `ReturnPerson`, `ReturnTo`, `ReturnTime`, `Status`, `CurrentStatus`)
VALUES (4, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Room Temp', '2013-11-20 15:54:18', 'In', NULL),
       (5, 'Be 3 25', 3, 'David Sutton', 'Room Temp', '2013-11-20 15:54:55', 'Potency˙', NULL, NULL, NULL, 'Out', NULL),
       (6, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Room Temp', '2013-11-20 15:55:34', 'In', NULL),
       (7, 'Be 3 25', 3, 'David Sutton', 'Room Temp', '2013-11-20 21:25:18', 'Potency˙', NULL, NULL, NULL, 'Out', NULL),
       (8, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Room Temp', '2013-11-20 21:25:29', 'In', NULL),
       (9, 'Be 3 25', 3, 'David Sutton', 'Room Temp', '2013-11-20 21:25:39', 'Potency˙', NULL, NULL, NULL, 'Out', NULL),
       (10, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Refrigerator', '2013-11-20 21:25:47', 'In', NULL),
       (11, 'Be 3 25', 3, 'David Sutton', 'Refrigerator', '2013-11-20 22:11:54', 'Potency˙', NULL, NULL, NULL, 'Out',
        NULL),
       (12, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Room Temp', '2013-11-20 22:12:09', 'In', NULL),
       (13, 'Be 3 25', 3, 'David Sutton', 'Room Temp', '2013-11-20 22:12:29', 'Potency˙', NULL, NULL, NULL, 'Out',
        NULL),
       (14, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Room Temp', '2013-11-20 22:17:22', 'In', NULL),
       (15, 'Be 3 25', 3, 'David Sutton', NULL, '2013-11-20 22:22:17', NULL, NULL, NULL, NULL, 'Out', NULL),
       (16, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Room Temp', '2013-11-20 22:25:45', 'In', NULL),
       (17, 'Be 3 25', 3, 'David Sutton', 'Room Temp', '2013-11-20 22:25:51', 'Potency˙', NULL, NULL, NULL, 'Out',
        NULL),
       (18, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Room Temp', '2013-11-20 22:29:01', 'In', NULL),
       (19, 'Be 3 25', 3, 'David Sutton', 'Room Temp', '2013-11-20 22:29:07', 'Potency˙', NULL, NULL, NULL, 'Out',
        'Good'),
       (20, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Refrigerator', '2013-11-20 22:29:58', 'In', NULL),
       (21, 'Be 3 25', 3, 'David Sutton', 'Refrigerator', '2013-11-20 22:30:03', 'Potency˙', NULL, NULL, NULL, 'Out',
        'Good'),
       (22, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Room Temp', '2013-11-20 22:31:58', 'In', NULL),
       (23, 'Be 3 25', 3, 'David Sutton', 'Room Temp', '2013-11-20 22:32:03', 'Potency˙', NULL, NULL, NULL, 'Out',
        'Good'),
       (24, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Room Temp', '2013-11-20 22:34:36', 'In', NULL),
       (25, 'Be 3 25', 3, 'David Sutton', 'Room Temp', '2013-11-20 22:34:41', 'Potency˙', NULL, NULL, NULL, 'Out',
        'Good'),
       (26, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Room Temp', '2013-11-20 22:36:48', 'In', NULL),
       (27, 'Be 3 25', 3, 'David Sutton', 'Room Temp', '2013-11-20 22:36:53', 'Potency˙', NULL, NULL, NULL, 'Out',
        'Good'),
       (28, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Room Temp', '2013-11-20 22:38:37', 'In', NULL),
       (29, 'Be 3 25', 3, 'David Sutton', 'Room Temp', '2013-11-20 22:38:42', 'Potency˙', NULL, NULL, NULL, 'Out',
        'Leaking'),
       (30, 'Be 3 37', 10, NULL, NULL, NULL, NULL, 'David Sutton', 'Freezer', '2013-11-22 14:06:54', 'In', NULL),
       (31, 'Be 3 37', 10, 'David Sutton', 'Freezer', '2013-11-22 14:32:13', 'Potency˙', NULL, NULL, NULL, 'Out',
        'Good'),
       (32, 'Be 3 25', 3, NULL, NULL, NULL, NULL, 'David Sutton', 'Room Temp', '2013-12-02 15:04:37', 'In', NULL);

/*!40000 ALTER TABLE `custodyLog`
    ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers`
(
    `CustID`             int(10) NOT NULL,
    `First Name`         varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
    `Last Name`          varchar(255) COLLATE utf32_unicode_ci                   DEFAULT NULL,
    `Company`            varchar(255) COLLATE utf32_unicode_ci                   DEFAULT NULL,
    `Department`         varchar(255) COLLATE utf32_unicode_ci                   DEFAULT NULL,
    `Address1`           varchar(255) COLLATE utf32_unicode_ci                   DEFAULT NULL,
    `Address2`           varchar(255) COLLATE utf32_unicode_ci                   DEFAULT NULL,
    `City`               varchar(255) COLLATE utf32_unicode_ci                   DEFAULT NULL,
    `State`              varchar(5) COLLATE utf32_unicode_ci                     DEFAULT NULL,
    `Zip`                varchar(15) COLLATE utf32_unicode_ci                    DEFAULT NULL,
    `Main Phone`         varchar(30) COLLATE utf32_unicode_ci                    DEFAULT NULL,
    `Direct Phone`       varchar(30) COLLATE utf32_unicode_ci                    DEFAULT NULL,
    `Cell Phone`         varchar(30) COLLATE utf32_unicode_ci                    DEFAULT NULL,
    `Email`              varchar(255) COLLATE utf32_unicode_ci                   DEFAULT NULL,
    `Website`            varchar(255) COLLATE utf32_unicode_ci                   DEFAULT NULL,
    `Fax`                varchar(30) COLLATE utf32_unicode_ci                    DEFAULT NULL,
    `Comments`           text COLLATE utf32_unicode_ci,
    `_placeholderGlobal` int(10)                                                 DEFAULT NULL,
    `CustomerNumber`     varchar(255) COLLATE utf32_unicode_ci                   DEFAULT NULL,
    `CellPhoneMask`      varchar(255) COLLATE utf32_unicode_ci                   DEFAULT NULL,
    PRIMARY KEY (`CustID`),
    UNIQUE KEY `_placeholderGlobal` (`_placeholderGlobal`),
    UNIQUE KEY `_placeholderGlobal_2` (`_placeholderGlobal`),
    UNIQUE KEY `_placeholderGlobal_3` (`_placeholderGlobal`),
    KEY `CustID` (`CustID`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf32
  COLLATE = utf32_unicode_ci;

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers`
    DISABLE KEYS */;

INSERT INTO `customers` (`CustID`, `First Name`, `Last Name`, `Company`, `Department`, `Address1`, `Address2`, `City`,
                         `State`, `Zip`, `Main Phone`, `Direct Phone`, `Cell Phone`, `Email`, `Website`, `Fax`,
                         `Comments`, `_placeholderGlobal`, `CustomerNumber`, `CellPhoneMask`)
VALUES (1000000, 'Ron', 'Sutton', 'CIAL', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 'CIAL', NULL),
       (1006020, 'David', 'Sutton', 'Digital eSolutions', 'IT Dept', '1724 Thurow St.', '', 'Sycamore', 'IL', '60178',
        '224-402-5253', '815-217-4009', '', 'dsutton@mac.com', 'www.desmail.com', '', 'Great IT guy!', 1, 'DES', NULL),
       (1007496, 'Stephanie', 'Authurs', '1960 Pharmacy', '', '830 FM 1960 rd. ste. 20', '', 'Houston', 'TX', '77090',
        '(281)893-600', '', '', '1960pharmacy@att.net', '', '(281)893-6001', '', 2, 'Aa', NULL),
       (1007742, 'Randy', 'Howe', 'Alabama Pain Center', '', '600 Whitesport Dr. Ste. A', '', 'Huntsville', 'AL',
        '35801', '(256)882-2003', '', '', 'rhowe@alabampaincenter.com', '', '(256)880-0557',
        'Please email all lab results', 3, 'Ae', NULL),
       (1007988, 'John', 'Sanderstorm', 'ASL Pharmacy', '', '900 Calle Plano Ste. M', '', 'Camarillo', 'CA', '93012',
        '(866)552-7579', '', '', 'johns@aslrx.com', '', '(866)442-7579', '', 4, 'Ad', NULL),
       (1008111, 'Lameck', 'Nyakweba', 'Avondale Neighborhood Pharmacy', '', '10750 W. McDowell Ave.', '', 'Avondale',
        'AZ', '81302', '(623)932-9800', '', '', 'anpllc@gmail.com', '', '(623)932-9817',
        'Please call/email all lab results.', 5, 'Ag', NULL),
       (1008234, 'Sean', 'Weeks', 'Bacon East Pharmacy', '', '5425 East St. Ste 5', '', 'Concord', 'CA', '94520',
        '(925)687-0565', '', '', 'seanweekes007@gmail.com', '', '(925)687-7925', 'Please email', 6, 'Bp', NULL),
       (1008357, 'Greg', 'Wallace', 'Bellevue Pharmacy', '', '212 Millwell Dr. Ste. A', '', 'Maryland Heights', 'MO',
        '63043', '(314)727-8787', '', '', 'gwallace@bllevuerx.com', '', '(314)727-2830',
        'Please Email Greg with all lab results', 7, 'Be', NULL),
       (1008480, 'Ruchin', 'Patel', 'Bio-Care Pharmacy', '', '1409 NE 26th St.', '', 'Wilton Mannors', 'FL', '33305',
        '(954)566-6151', '', '', 'biocarepharmacy@aol.com', '', '(954)566-6181', '', 8, 'Bd', NULL),
       (1008603, 'Pam', 'Hammar', 'Bittings Pharmacy', '', '619 SE 17th St.', '', 'Oscala', 'FL', '43471',
        '(352)732-3667', '', '', 'lloyde041908@comcast.net', '', '(352)732-1107', '', 9, 'Bc', NULL),
       (1008726, 'Miles', 'Doane', 'Brown\'s Compounding Center', '', '10259 S. Parker Road #105', '', 'Parker', 'CO',
        '80134', '(303)805-9543', '', '', 'info@brownscompounding.com', '', '(303)805-0849', '', 10, 'Ba', NULL),
       (1008849, 'Kamran', 'Malik', 'CBS Chem Limited', '', '621 S. 48th St. Ste. 114', '', 'Tempe', 'AZ', '85281',
        '(480)499-4302', '', '', 'kamran@cbschem.com', '', '(480)499-4352', '', 11, 'CBSC', NULL),
       (1008972, 'Justin', 'Dipisa', 'Century Pharmacy', '', '37 West Century Rd. Ste. 113', '', 'Paramus', 'NJ',
        '07652', '(885)742-7623', '', '', 'jdipisa@cp-rx.com', '', '(885)373-6779', '', 12, 'Cj', NULL),
       (1009095, 'John', 'Hart', 'Compounding Pharmaceuticals Technology', '', '1048 Stanton Rd. Ste. B', '', 'Daphne',
        'AL', '36526', '(251)626-2820', '', '', 'johnhart@cptinc.org', '', '(251)626-2850', '', 13, 'Cg', NULL),
       (1009218, 'Nick', 'Curtin', 'Curtin Drug', '', '13101 S. Elwood Ave Ste B', '', 'Glenpool', 'OK', '74033',
        '(918)528-6000', '', '', 'nick@curtindrug.com', '', '(918)528-6060', '', 14, 'Cf', NULL),
       (1009341, 'Andy', 'Segehart', 'Custom Care Compounding Pharmacy', '', '405 S Clark Ste 150', '', 'Carroll', 'IA',
        '51401', '(712)792-3212', '', '', '', '', '(712)792-0160', '', 15, 'Ce', NULL),
       (1009464, 'Barb', 'Lewis', 'Custom Prescriptions of Lancaster', '', '902 Duke St.', '', 'Lancaster', 'PA',
        '17602', '(717)393-0518', '', '', 'diane@customscripts.us', '', '(717)393-0519', '', 16, 'Cb', NULL),
       (1009587, 'Matt', 'Murray', 'Customedica Pharmacy', '', '149 W. State Street Ste. 101', '', 'Eagle', 'ID',
        '83616', '(208)939-8008', '', '', 'Matt@customedica.com', '', '(208)938-1067', '', 17, 'Ch', NULL),
       (1009710, 'Charles', 'Daleo', 'Daleo Compounding Pharmacy', '', '2400 Calder at 8th St.', '', 'Beaumont', 'TX',
        '77702', '(409)833-2211', '', '', 'cdaleo@cmaaccess.com', '', '(409)833-8549', '', 18, 'Db', NULL),
       (1009833, 'Melissa', 'Rowell', 'Diamondback Drugs', '', '7901 E. McDowell Rd.', '', 'Scottsdale', 'AZ', '95257',
        '(480)946-2223', '', '', 'Rowell@diamondbackdrugs.net', '', '(480)946-2235', '', 19, 'Dc', NULL),
       (1009956, 'Jane', 'Patel', 'DR Pharmacy', '', '501 Andrews Hwy. Std. 100', '', 'Midland', 'TX', '79701',
        '(432)683-3372', '', '', 'janeph@yahoo.com', '', '(432)683-3395', '', 20, 'De', NULL),
       (1010079, 'Dorinda', 'Martin', 'DSRx', '', '100 Commons Rd. Ste. 1', '', 'Dripping Springs', 'TX', '78620',
        '(512)924-4280', '', '', 'dorinda1@sbcglobal.net', '', '(512)858-5411', '', 21, 'Da', NULL),
       (1010202, 'Donalee', 'Peters', 'Eden Pharmacy', '', '', '10955 Westmoor Dr. Ste. 400', 'Broomfield', 'CO',
        '80021', '(303)667-5114', '', '', 'dpeters@edeintline.com', '', '(303)379-2140', '', 22, 'Ec', NULL),
       (1010325, 'Cimber', 'Sharp', 'Essential Pharmacy Compounding', '', '620 N 114th St.', '', 'Omaha', 'NE', '68154',
        '(402)408-0012', '', '', 'csharp@kohlls.com', '', '(402)408-0020', '', 23, 'Eb', NULL),
       (1010448, 'Erika', 'Fallon', 'Fallon Wellness Pharmacy', '', '1057 Troy Schenectady', '', 'Latham', 'NY',
        '12110', '(518)220-2005', '', '', 'fallonwellnesspharmacy@yahoo.com', '', '(518)220-5004', '', 24, 'Ff', NULL),
       (1010571, 'Mike', 'Eudy', 'Family Pharmacy of Statesville', '', '208 Old Mocksville Rd.', '', 'Statesville',
        'NC', '28625', '(704)872-0296', '', '', 'mikeeudy@bellsouth.net', '', '(704)871-8156', '', 25, 'Fa', NULL),
       (1010694, 'Ray', 'Holt', 'Farm Fresh Compounding Pharmacy', '', '601 Children\'s Lane', '', 'Norfolk', 'VA',
        '23507', '(757)668-6337', '', '', 'farmfresh.x.360pharmacy@supervalu.com', '', '(757)624-3682', '', 26, 'Fc',
        NULL),
       (1010817, 'Tim', 'Vitullo', 'Foothills Professional Pharmacy', '', '4545 E. Chandler Blvd. #100', '', 'Phoenix',
        'AZ', '85048', '(480)496-4444', '', '', 'foothillspharmacy@gmail.com', '', '(480)496-4450', '', 27, 'Fg', NULL),
       (1011186, 'Greg', '', 'Fox Infusion', '', '1997 W. Price St.', '', 'Tucson', 'AZ', '85705', '(520)795-0111', '',
        '', 'greg@foxinfusion.com', '', '(520)795-2332', '', 28, 'Fb', NULL),
       (1011309, 'Stefanie', 'Warden', 'Grove Pharmacy', '', '3050 S. National Ste. 109', '', 'Springfield', 'MO',
        '65804', '(417)881-8822', '', '', 'sjones@grovepharmacy.com', '', '(417)888-0667', '', 29, 'Ga', NULL),
       (1011432, 'Dan', 'Valentine', 'Hartman Brother\'s Pharmacy', '', '531 E. Main St.', '', 'Montrose', 'CO',
        '81401', '(970) 252-1760', '', '', 'pharmacy@hartmanbrothers.biz', '', '(970)240-4276', '', 30, 'Hp', NULL),
       (1011555, 'Melissa', '', 'Harvest Drug and Gift', '', '4426 Kell', '', 'Wichita Falls', 'TX', '76309',
        '(940)692-7081', '', '', 'melissa@harvestdrug.com', '', '(940)692-9676', '', 31, 'Hi', NULL),
       (1011678, '', '', 'Healing Springs Pharmacy', '', '2449 Ross Millville Rd. Ste. 185', '', 'Hamilton', 'OH',
        '45013', '(513)863-8000', '', '', 'ksmcmillin@yahoo.com', '', '(513)863-8001', '', 32, 'Hj', NULL),
       (1011801, 'Heather', 'Brown', 'Health Dimensions Pharmacy', '', '39303 Country Club Dr.', '', 'Farmington Hills',
        'MI', '48331', '(248)489-1573', '', '', 'IVROOM@HDRX.com', '', '(248)489-1586', '', 33, 'Ha', NULL),
       (1011924, 'Jennifer', 'Stevens', 'Hopkinton Drug, Inc', '', '52 Main St.', '', 'Hopkinton', 'MA', '01748',
        '(508)435-4441 (ext: 113 or 123', '', '', 'jstevens@rxandhealth.com', '', '(508)497-5065', '', 34, 'Hh', NULL),
       (1012047, 'Steve', 'Horst', 'Horst Pharmacy', '', '2705 E. Jackson Blvd.', '', 'Jackson', 'MO', '63755',
        '(573)243-8173', '', '', 'shorst@sbcglobal.net', '', '(573)243-8174', '', 35, 'Hb', NULL),
       (1012170, 'Shawn', 'Hodges', 'Innovation Compounding', '', '6095 Pine Mountain Rd. Ste. 108', '', 'Marietta',
        'GA', '30060', '(770)421-1399', '', '', 'pharmacist@innovationcompounding.com', '', '(770)426-1965', '', 36,
        'Ib', NULL),
       (1012293, '', '', 'Ionia Pharmacy', '', '15421 Redhill Ave. Ste.A', '', 'Tustin', 'CA', '92780', '(855)464-6642',
        '', '', 'pharmacist@ioniapharmacy.com', '', '(855)884-6642', '', 37, 'In', NULL),
       (1012416, '', '', 'J & D Pharmacy', '', 'P O Box 1599', '', 'Warsaw', 'MO', '65355', '(660)438-7331', '', '',
        'dnretherford@yahoo.com', '', '(660)438-6168', '', 38, 'Jb', NULL),
       (1012539, 'Uldis', 'Pironis', 'Jefferson City Apothecary', '', '1739 Elm Ct.', '', 'Jefferson City', 'MO',
        '65101', '(573)634-8300', '', '', '', '', '(573)634-8399', '', 39, 'Ja', NULL),
       (1012662, 'Elsie', 'Huey', 'Kaiser Permenante Pharmacy', '', '99 Montecillo Rd.', '', 'San Rafael', 'CA',
        '94903', '(415)444-4882', '(415)720-8183', '', 'elsie.huey@kp.org', '', '(415)444-2077', '', 40, 'Kf', NULL),
       (1012785, 'Debbie', 'Martinson', 'Keystone Pharmacy', '', '4021 Cascade Rd. SE', '', 'Grand Rapids', 'MI',
        '49546', '(616)974-9792', '', '', '', '', '(616)464-3469', '', 41, 'Ka', NULL),
       (1012908, 'Steve', 'Belkowski', 'Kilgore\'s Medical Pharmacy', '', '1608 Chapel Hill Rd.', '', 'Columbia', 'MO',
        '65203', '(573)447-4444', '', '', 'steve@kilgoresRX.com', '', '(573)447-4054', '', 42, 'Kd', NULL),
       (1013031, 'BethMarcia', 'StubbsYount', 'Kilgore\'s Medical Pharmacy', '', '700 Providence', '', 'Columbia',
        'MO', '65203', '(573)442-0194', '', '', 'marcia@kilgoresrx.com', '', '(573)443-8253', '', 43, 'Kc', NULL),
       (1013154, 'Robin', 'Johnson', 'King\'s Pharmacy', '', '1600 Coulter Ste. 307', '', 'Amarillo', 'TX', '79106',
        '(806)358-4576', '', '', 'robin@amaonline.com', '', '(806)358-4323', '', 44, 'Kb', NULL),
       (1013277, 'Gabe', '', 'Mableton Pharmacy', '', '5390 Floyd Rd.', '', 'Mableton', 'GA', '30126', '(770)948-3133',
        '', '', 'mableton.pharmacy@gmail.com', '', '(770)948-3660', '', 45, 'Mr', NULL),
       (1013400, 'Jane', 'Besich-Carter', 'Madigan Healthcare System', 'Radiology', '9040A Reid st.', '', 'Tacoma',
        'WA', '98431', '(253)968-1213', '', '', '', '', '', '', 46, 'Mo', NULL),
       (1013523, 'Roger', 'Warndahl', 'Mayo Clinic Pharmacy', '', '21 Second St. SW LL B10A', '', 'Rochester', 'MN',
        '55902', '', '', '', 'Warndahl.roger@mayo.edu', '', '', '', 47, 'Mb', NULL),
       (1013646, '', '', 'Medical Center West Pharmacy', '', '465 N. Belair Rd. Ste. 1A', '', 'Evans', 'GA', '30809',
        '(706)854-2424', '', '', 'MCWP2003@hotmail.com', '', '(706)854-2425', '', 48, 'Mm', NULL),
       (1013769, 'Karen', 'Williams', 'Medicine Shoppe Pharmacy', '', '2431 N. Union Blvd.', '', 'Colorado Springs',
        'CO', '80909', '(719)630-3154', '', '', '0437@medicineshoppe.com', '', '(719)630-1640', '', 49, 'Mp', NULL),
       (1013892, 'Brad', '', 'Medicine Shoppe 0635', '', '551 W. High Ave.', '', 'New Phila', 'OH', '44663',
        '(330)339-4466', '', '', 'Brad@medshoprx.com', '', '(330)339-9007', '', 50, 'Ml', NULL),
       (1014015, 'Patrick', 'Ellis', 'Memorial Healthcare System', '', '2525 DeSales Ave.', '', 'Chattanooga', 'TN',
        '37404', '(423)495-7461', '', '', 'patrick_ellis@memorial.org', '', '(423)495-8487', '', 51, 'Ms', NULL),
       (1014138, 'Lee', 'Frisbie', 'Monument Pharmacy', '', '115 C 2nd St.', '', 'Monument', 'CO', '80132',
        '(719)481-2209', '', '', 'MP@rmi.net', '', '(719)481-4971', '', 52, 'Mk', NULL),
       (1014261, 'Susan', 'Merenstein', 'Murray Avenue Apothecary', '', '4227 Murray Ave.', '', 'Pittsburgh', 'PA',
        '15217', '(412)421-4996', '', '', 'lab@murrayavenuerx.comsusan@murrayavenuerx.com', '', '(412)421-6500', '',
        53, 'Mi', NULL),
       (1014384, 'Simon', 'Lorberg', 'Nate\'s Speciality Pharmacy', '', '2304 Nostrand Ave.', '', 'Brooklyn', 'NY',
        '11210', '(718)338-0709', '', '', 'pambarrera2003@yahoo.com', '', '(718)339-3880', '', 54, 'Nf', NULL),
       (1014507, 'Barb', 'Anliker', 'Northwest Iowa Compounding Pharmacy', '', '3204 1st St.', '', 'Emmetsburg', 'IA',
        '50536', '(712)852-2727', '', '', 'barbara@mansmithrx.com', '', '(712)852-2975', '', 55, 'Na', NULL),
       (1014630, '', '', 'Omiera Labs', '', '191 W. Burton Mesa Blvd. Ste. E', '', 'Lompoc', 'CA', '93436',
        '(805)733-2060', '', '', 'pharmacist@omieralabs.com', '', '(805)733-2961', '', 56, 'Om', NULL),
       (1014753, 'Gary', 'Henglefelt', 'One Point Patient Care', '', '3006 S. Priest Dr.', '', 'Tempe', 'AZ', '85282',
        '(480)240-1110', '', '', 'ghenglefelt@oppc.com', '', '(480)240-1112', '', 57, 'Ob', NULL),
       (1014876, 'ChangCheng', 'Zhu', 'PATH', '', '2201 Westlake Ave. Ste. 200', '', 'Seattle', 'WA', '98121',
        '(206)285-3500', '', '', '', '', '', '', 58, 'Pt', NULL),
       (1014999, 'Eduardo', 'Silva', 'Ordway Drug Store', '', '499 Alvarado St', '', 'Monterey', 'CA', '93940',
        '(831)372-8085', '', '', 'eddiesilva1@gmail.com', '', '(831)372-5768', '', 59, 'Oa', NULL),
       (1015122, 'Patty', 'Lundblade', 'PD Labs, Inc.', '', '19230 Stone Oak Parkway, Ste. 200', '', 'San Antonio',
        'TX', '78258', '(210)494-1678', '', '', 'plundblade@pdlabs.net', '', '(210)494-3010', '', 60, 'Pn', NULL),
       (1015245, 'James', 'Nahill', 'Pallimed Solutions', '', '400 W. Cummings Park, Ste. 1050', '', 'Woburn', 'MA',
        '01801', '(781)937-3344', '', '', 'info@pallmed.com', '', '(781)937-3388', '', 61, 'Pk', NULL),
       (1015368, 'Mel', 'Rauton', 'Palmetto Custom Compounding', '', '107 Rutledge Ave.', '', 'Charleston', 'SC',
        '29401', '(843)723-5343', '', '', 'pccrx@comcast.net', '', '(843)723-5344', '', 62, 'Pl', NULL),
       (1015491, 'Dennis', 'Saadeh', 'Park Pharmacy and Compounding Center', '', '9257 Research Dr.', '', 'Irvine',
        'CA', '92618', '(949)551-7195', '', '', 'dennis@parkrx.com', '', '(949)551-1950', '', 63, 'Pd', NULL),
       (1015614, 'Joseph', 'Pierre', 'Patio Drugs Healthcare Network', '', '5208 Veterans Blvd.', '', 'Metarie', 'LA',
        '70006', '(504)889-7070', '', '', 'jpierre@patiodrugs.com', '', '(504)889-7060', '', 64, 'Pj', NULL),
       (1015737, 'Terry', 'Whitten', 'Pavilion Infusion Therapy Pharmacy', '', '3563 Phillips Hwy. #202', '',
        'Jacksonville', 'FL', '32207', '(904)202-5730', '', '', 'terrywhitten@bmcjax.com', '', '(904)398-2225', '', 65,
        'Pi', NULL),
       (1015860, 'SusanYvonne', 'DavenportRegensberg', 'Pencol Medisave Pharmacy', '',
        '1325 Colorado Blvd. Ste. B-024', '', 'Denver', 'CO', '80222', '(303)388-3613', '', '', 'info@pencolRx.com', '',
        '(303)388-6182', '', 66, 'Pa', NULL),
       (1015983, 'RichSarahDanielle', 'GaffinEchevarriaEvans', 'Pet Health Pharmacy', '', '12012 N. 111th Ave.', '',
        'Youngtown', 'AZ', '85363', '(800)742-0516 (Ext: 9599)', '', '',
        'sechevarria@pethealthpharmacy.com, devans@pethealthpharmacy.com', '', '(866)373-0030', '', 67, 'Pe', NULL),
       (1016106, 'Dan', 'Loper', 'Pharmaceutical Specialties, Inc. ', '', '150 Cleveland Rd. Ste. A', '', 'Bogart',
        'GA', '30622', '(706)369-9591', '', '', 'dan@psipharmacy.com', '', '(706)369-96989', '', 68, 'Pr', NULL),
       (1016229, 'Carl', 'Nigh', 'Pharmacy Services, Inc.', '', '212 Millwell Dr.', '', 'Maryland Heights', 'MO',
        '63043', '(314)727-8787', '', '', '', '', '', '', 69, 'Pm', NULL),
       (1016352, 'Danny', 'Gelber', 'Physicians\' Compounding Services', '', '22451 Califa St. Ste. 230', '',
        'Woodland Hills', 'CA', '91367', '(818)642-6450', '', '', 'gelberdanny@gmail.com', '', '(818)594-0814', '', 70,
        'Pb', NULL),
       (1016475, 'Ron', 'Sylvain', 'Pioneer Health Compounding Pharmacy', '', '520 Hartford Turnpike', '', 'Vernon',
        'CT', '06066', '(860)979-0089', '', '', 'ron@pioneerhealthcenter.com', '', '(860)979-0091', '', 71, 'Po', NULL),
       (1016598, 'Lauren', '', 'Precision Pharmacy', '', '5301 Young St.', '', 'Bakersfield', 'CA', '93311',
        '(661)377-3333', '', '', 'rtaggs@myprecisionpharmacy.com', '', '(661)377-3334', '', 72, 'Pv', NULL),
       (1016721, '', '', 'Professional Building Pharmacy', '', '251 Medical Center #100', '', 'Webster', 'TX', '77598',
        '(281)332-2496', '', '', 'jlee45@ahinet', '', '(281)332-3672', '', 73, 'Pw', NULL),
       (1016844, 'Robin', 'Chang', 'Provincial Pharmacy', '', '1400 Provincial Rd.', 'Windsor, Ontario, Canada N8W5W1',
        '', '--', '', '(519)972-8788', '', '', 'robin@provincialpharmacy.com', '', '(519)972-5637', '', 74, 'Pc', NULL),
       (1016967, 'Jeff', 'Hval', 'QualMed Pharmacy', '', '14 Inverness Dr. E Ste H-140', '', 'Englewood', 'CO', '80112',
        '(303)790-8200', '', '', 'jhval@qualmedpharmacy.com', '', '(303)790-8201', '', 75, 'Qa', NULL),
       (1017090, 'Stacey', 'Saludares', 'Raley\'s Compounding', '', '2928 Ramco St. Ste. 100', '', 'West Sacramento',
        'CA', '95691', '(916)403-2828', '', '', 'compounding@rales.com', '', '(916)403-2881', '', 76, 'Rc', NULL),
       (1017213, 'BruceMatt', 'DellPotter', 'Roadrunner Pharmacy', '', '711 E. Carefree Hwy. #140', '', 'Phoenix',
        'AZ', '85085', '(623)434-1180', '', '', 'mpotter@roadrunnerpharmacy.com', '', '(623)434-1181', '', 77, 'Rb',
        NULL),
       (1017336, 'Holly', 'Rotar', 'Rocky Mountain Pharmacy', '', '25 N. Wilson Ste. C', '', 'Bozeman', 'MT', '59715',
        '(406)587-4332', '', '', 'hgraff@mcn.net', '', '(406)587-8125', '', 78, 'Ro', NULL),
       (1017459, 'Steve', 'Hoyt', 'San Ysidro Pharmacy ', '', '1498 East Valley Road', '', 'Santa Barbara', 'CA',
        '93108', '805-969-2284', '', '', '', '', '805-565-3174', '', 79, 'Sa', NULL),
       (1017582, 'Erin', 'Butler', 'Scottsdale Professional Pharmacy', '', '10900 N. Scottsdale Rd. Suite 403', '',
        'Scottsdale ', 'AZ', '85284', '408-946-9477', '', '', 'scottsdaleprofes@qwestoffice.net', '', '408-946-1345',
        '', 80, 'Sr', NULL),
       (1017705, 'David', 'Matsuo', 'Silicon Valley Pharmacy ', '', '14107 S. Winchester Blvd ', '', 'Los Gatos ', 'CA',
        '95032', '408-378-5381', '', '', 'siliconvalleyrx@yahoo.com', '', '408-378-1159', '', 81, 'Sg', NULL),
       (1017828, 'Adam', 'Crone', 'St. Mary & Elizabeth Hospital (CHI) Chad Kays Pharmacy ', '',
        '1850 Bluegrass Avenue ', '', 'Louisville', 'KY', '40214', '502-631-6419', '502-367-3342', '',
        'adamcrone@kentuckyonehealth.org', '', '502-361-6528', '', 82, 'St', NULL),
       (1017951, 'Evelyn', 'Talbert', 'Stanford Hospital', '', '300 Pasteur Drive Room H0301', '', 'Stanford ', 'CA',
        '94305', '650-498-4353', '', '', 'lotran@stanfordmed.org', '', '408-568-8443', '', 83, 'Sd', NULL),
       (1018074, 'Claudia ', 'Hoyos', 'Steven\'s Pharmacy', '', '1525 Mesa Verde Dr. East', '', 'Costa Mesa', 'CA',
        '92626', '714-540-8911', '', '', 'stevensrx@yahoo.com', '', '714-435-0261', '', 84, 'Sf', NULL),
       (1018197, 'William ', 'Wilcox', 'Stockton Pet Hospital', '', '1234 S. Wadsworth Blvd', '', 'Lakewood', 'CO',
        '80232', '303-985-7113', '', '', 'stocktonph@aol.com', '', '303-914-9198', '', 85, 'Sp', NULL),
       (1018320, 'Timothy ', 'Glascock', 'Surgery Pharmacy Services ', '', '3908 Tennessee Ave Suite F', '',
        'Chattanooga', 'TN', '31409', '423-421-1740', '', '', 'surgerypharmacy@gmail.com', '', '423-821-0810', '', 86,
        'Sb', NULL),
       (1018443, 'David', 'Morris', 'Tackett Compounding Pharmacy', '', '132 El Chico Trail ', '', 'Willow Park', 'TX',
        '76087', '817-441-7046', '', '', 'david@tackettpharmacy.com', '', '817-441-5371', '', 87, 'Tg', NULL),
       (1018566, 'Blake', 'Reynolds ', 'Tackett Custom Medications           ', '', '175 College Park Drive', '',
        'Weatherford', 'TX', '76036', '817-550-6046', '', '', 'blake@tackettpharmacy.com', '', '817-550-6047', '', 88,
        'Tw', NULL),
       (1018689, 'Rachel', 'Pittman', 'Talon Pharmacy ', '', '2950 Thousand Oaks Suite 25', '', 'San Antonio', 'TX',
        '78247', '210-424-0025', '', '', 'tech@taloncompounding.com', '', '210-424-0026', '', 89, 'Ta', NULL),
       (1018812, 'Laurie ', 'Ellis', 'The Clinical Pharmacy', '', '200 Conway Drive', '', 'Kalispell', 'MT', '59901',
        '406-892-9121', '', '', 'lelli@krmc.org', '', '406-257-5230', '', 90, 'Tf', NULL),
       (1018935, 'Joel', 'Frieders', 'The Compounder', '', '340 Marshall Ave Unit 100', '', 'Aurora', 'IL', '60506',
        '630-859-0333', '', '', 'orders@thecompounder.com', '', '639-859-0114', '', 91, 'Tc', NULL),
       (1019058, 'Sharon ', 'Hagan', 'The Lime in the Coconut Compounding Pharmacy', '', 'P.O. Box 2145', '',
        'Lake Ozark', 'MO', '65049', '573-964-6786', '', '', 'pharm3@aol.com', '', '573-964-5270', '', 92, 'Th', NULL),
       (1019181, 'Tim', 'Wright', 'The Pharmacy on 15th Street', '', '607 15th Street Suite A', '', 'Tuscaloosa', 'AL',
        '35401', '205-752-0627', '', '', 'pharmacy15@bellsouth.net', '', '205-752-0624', '', 93, 'Td', NULL),
       (1019304, 'Lisa', 'Hervey', 'Tri State Pharmacy', '', '651 Colliers Way', '', 'Weirton', 'WV', '26062',
        '304-723-6331', '', '', '', '', '304-723-1131', '', 94, 'Tb', NULL),
       (1019427, 'Mike', 'Stecklein', 'U-Save Pharmacy', '', '2505 Canterbury', '', 'Hays', 'KS', '67601',
        '785-625-2529', '', '', 'mstecklein@gmail.com', '', '785-625-8176', '', 95, 'Uf', NULL),
       (1019550, 'Amphorn', 'Hosakul', 'University of Washington Drug Services ', '', '1959 NE Pacific, RM EA-127', '',
        'Seattle', 'WA', '98195-6058', '206-598-6058', '', '', 'drugsvcs@u.washington.edu', '', '206-598-3808', '', 96,
        'Uc', NULL),
       (1019673, 'Talia ', 'Janzen', 'Vet\'s First Choice ', '', '5013 S 110th Street', '', 'Omaha', 'NE', '68137',
        '402-218-5331', '', '', 'tjanzen@vetsfirstchoice.com', '', '', '', 97, 'Ve', NULL),
       (1019796, 'Cherie', 'Wright', 'Wellness Pharmacy', '', '3401 Independence Dr Suite 231', '', 'Birmingham', 'AL',
        '35226', '205-879-6551', '', '', 'cwright@wellnesshealth.com', '', '205-871-2568', '', 98, 'Wd', NULL),
       (1019919, 'Blanche', '', 'Williams Apothecary ', '', '201 E Chestnut St', '', 'Lancaster', 'PA', '17602',
        '717-393-3814', '', '', 'rwwilliams@williamsapothecary.com', '', '717-393-7537', '', 99, 'Wb', NULL),
       (1020042, 'Gina', 'Besteman', 'Women\'s International Pharmacy', '', '2 Marsh Court', '', 'Madison', 'WI',
        '53718', '608-221-7800', '', '', 'gina@womensinternational.com', '', '608-221-7810', '', 100, 'Wa', NULL);

/*!40000 ALTER TABLE `customers`
    ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table extdata
# ------------------------------------------------------------

DROP TABLE IF EXISTS `extdata`;

CREATE TABLE `extdata`
(
    `name`     varchar(255) DEFAULT NULL,
    `birthday` date         DEFAULT NULL,
    `age`      int(2)       DEFAULT NULL,
    `today`    datetime     DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1;



# Dump of table jobs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `jobs`;

CREATE TABLE `jobs`
(
    `jobs_id`            int(255) NOT NULL AUTO_INCREMENT,
    `jobsName`           varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `jobsStatus`         varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `jobsStartDate`      datetime                              DEFAULT NULL,
    `jobsModifyDate`     datetime                              DEFAULT NULL,
    `jobsLastUser`       varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `job2customer`       varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `jobsTracking`       varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    `_placeholderGlobal` varchar(255) COLLATE utf32_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`jobs_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf32
  COLLATE = utf32_unicode_ci;

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs`
    DISABLE KEYS */;

INSERT INTO `jobs` (`jobs_id`, `jobsName`, `jobsStatus`, `jobsStartDate`, `jobsModifyDate`, `jobsLastUser`,
                    `job2customer`, `jobsTracking`, `_placeholderGlobal`)
VALUES (1, 'CIAL Single Method', 'Completed', '2013-01-01 00:00:00', '2013-09-25 16:51:21', 'Ron Sutton', 'CIAL', NULL,
        '3'),
       (7, 'Be 3 25', 'Completed', '2013-11-20 15:32:39', '2013-11-21 21:33:03', 'David Sutton', 'Bellevue Pharmacy',
        'Scott', NULL),
       (8, 'Be 3 37', 'Log In', '2013-11-22 14:02:33', '2013-11-22 14:06:28', 'David Sutton', 'Bellevue Pharmacy',
        'Scott', NULL);

/*!40000 ALTER TABLE `jobs`
    ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table methods
# ------------------------------------------------------------

DROP TABLE IF EXISTS `methods`;

CREATE TABLE `methods`
(
    `ActiveIngredient`                               varchar(255)   DEFAULT NULL,
    `ActiveIngredientDescription`                    text,
    `ActiveIngredientPreparation`                    text,
    `cb_done`                                        varchar(10)    DEFAULT NULL,
    `CustLotNumber`                                  varchar(255)   DEFAULT NULL,
    `CustomerName`                                   varchar(255)   DEFAULT NULL,
    `CustomerOrderDescription`                       text,
    `CustomerOrderFormLineNumber`                    int(10)        DEFAULT NULL,
    `LabJobName`                                     varchar(255)   DEFAULT NULL,
    `method2job`                                     int(10)        DEFAULT NULL,
    `Method2Mixed`                                   varchar(255)   DEFAULT NULL,
    `methodAIStatus`                                 varchar(255)   DEFAULT NULL,
    `methodCondition`                                varchar(255)   DEFAULT NULL,
    `methodClass`                                    varchar(255)   DEFAULT NULL,
    `methodDate`                                     datetime       DEFAULT NULL,
    `methodDueDate`                                  datetime       DEFAULT NULL,
    `MethodID`                                       int(10) NOT NULL AUTO_INCREMENT,
    `MethodName`                                     varchar(255)   DEFAULT NULL,
    `methodReportComments`                           varchar(255)   DEFAULT NULL,
    `methodStorageCondition`                         varchar(255)   DEFAULT NULL,
    `methodTrackingNumber`                           varchar(255)   DEFAULT NULL,
    `methodType`                                     varchar(255)   DEFAULT NULL,
    `methodUserID`                                   varchar(255)   DEFAULT NULL,
    `singleMethodCustomerComments`                   text,
    `singleMethodCustomerStabilityStudyInstructions` text,
    `singleSampleAmount`                             decimal(20, 4) DEFAULT NULL,
    `TestTypeName`                                   varchar(255)   DEFAULT NULL,
    `methodLocation`                                 varchar(255)   DEFAULT NULL,
    `methodAssigned`                                 varchar(255)   DEFAULT NULL,
    `methodMixName`                                  text,
    `methodLabReportButton`                          varchar(255)   DEFAULT NULL,
    `methodModifyDate`                               datetime       DEFAULT NULL,
    `methodQRData`                                   varchar(255)   DEFAULT NULL,
    `methodCurrentStatus`                            varchar(255)   DEFAULT NULL,
    `methodConcentrationStandard`                    decimal(20, 6) DEFAULT NULL,
    `methodDilutionFactor`                           decimal(20, 6) DEFAULT NULL,
    `methodAreaSamplePeak`                           decimal(20, 6) DEFAULT NULL,
    `methodAreaStandardPeak`                         decimal(20, 6) DEFAULT NULL,
    `methodAmountInSample`                           decimal(20, 6) DEFAULT NULL,
    `methodAmountOfSample`                           decimal(20, 6) DEFAULT NULL,
    `methodCalcPotency`                              decimal(20, 6) DEFAULT NULL,
    `methodCalcPotencyPercent`                       decimal(20, 6) DEFAULT NULL,
    `methodTargetPotency`                            decimal(20, 6) DEFAULT NULL,
    `methodCalcPotencyPercentofPotencyTarget`        decimal(20, 6) DEFAULT NULL,
    `methodTargetPotencyPercent`                     decimal(20, 6) DEFAULT NULL,
    `methodCalcPotencyPercentofPotencyTargetPercent` decimal(20, 6) DEFAULT NULL,
    `methodMixSampleConcetration`                    decimal(20, 6) DEFAULT NULL,
    PRIMARY KEY (`MethodID`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

LOCK TABLES `methods` WRITE;
/*!40000 ALTER TABLE `methods`
    DISABLE KEYS */;

INSERT INTO `methods` (`ActiveIngredient`, `ActiveIngredientDescription`, `ActiveIngredientPreparation`, `cb_done`,
                       `CustLotNumber`, `CustomerName`, `CustomerOrderDescription`, `CustomerOrderFormLineNumber`,
                       `LabJobName`, `method2job`, `Method2Mixed`, `methodAIStatus`, `methodCondition`, `methodClass`,
                       `methodDate`, `methodDueDate`, `MethodID`, `MethodName`, `methodReportComments`,
                       `methodStorageCondition`, `methodTrackingNumber`, `methodType`, `methodUserID`,
                       `singleMethodCustomerComments`, `singleMethodCustomerStabilityStudyInstructions`,
                       `singleSampleAmount`, `TestTypeName`, `methodLocation`, `methodAssigned`, `methodMixName`,
                       `methodLabReportButton`, `methodModifyDate`, `methodQRData`, `methodCurrentStatus`,
                       `methodConcentrationStandard`, `methodDilutionFactor`, `methodAreaSamplePeak`,
                       `methodAreaStandardPeak`, `methodAmountInSample`, `methodAmountOfSample`, `methodCalcPotency`,
                       `methodCalcPotencyPercent`, `methodTargetPotency`, `methodCalcPotencyPercentofPotencyTarget`,
                       `methodTargetPotencyPercent`, `methodCalcPotencyPercentofPotencyTargetPercent`,
                       `methodMixSampleConcetration`)
VALUES ('Asprin', 'This is a CIAL Single Method', 'This is a CIAL Single Method', NULL, NULL, 'CIAL', NULL, NULL,
        'CIAL Single Method', 1, NULL, NULL, NULL, 'S', '2013-11-19 00:00:00', NULL, 2, 'CIAL Method', NULL, NULL, NULL,
        'Cream', 'CIAL Single Method', 'This is a CIAL Single Method', 'This is a CIAL Single Method', NULL, NULL, NULL,
        NULL, NULL, NULL, '2013-11-19 15:00:39', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
        NULL, NULL, NULL),
       ('Cimetidine', 'Green slimy looking stuff', 'Sonicated in bath for 20 minutes. Mixed into 25 ml of water.', 'On',
        '06062013-19', 'Bellevue Pharmacy',
        'Cimetidine 5%/Deoxy-D-Glucose 1%/Ibuprofen 5%/Imiquimod 5%/Lidocaine 5%/Rentinoic Acid 1%/Tea Tree Oil 5% Cream',
        1, 'Be 3 25', 7, 'M121506431', 'P', 'Leaking', 'M', '2013-11-20 15:33:57', NULL, 3, NULL,
        'Tea Tree Oil cannot be tested at this time', NULL, 'Be 3 25-1', 'Cream', 'David Sutton', 'Test CC', 'Test SSI',
        5.0000, 'Potency˙', 'Cabinet 1 Shelf A', 'Scott',
        'Cimetidine\rIbuprofen\rDexamethasone\rImiquimod\rLidocaine HCl\rRanitidine HCl\r5-Fluorouracil', NULL,
        '2013-12-02 15:04:37', '3\rBe 3 25', 'In', 0.405000, 50.000000, 1201796.000000, 1894753.000000, 1.000000,
        1.000000, 12.844085, 0.012844, NULL, NULL, NULL, NULL, NULL),
       ('Ibuprofen', 'Green slimy looking stuff', 'Sonicated in bath for 20 minutes. Mixed into 25 ml of water.', NULL,
        '06062013-19', 'Bellevue Pharmacy',
        'Cimetidine 5%/Deoxy-D-Glucose 1%/Ibuprofen 5%/Imiquimod 5%/Lidocaine 5%/Rentinoic Acid 1%/Tea Tree Oil 5% Cream',
        1, 'Be 3 25', 7, 'M121506431', 'P', NULL, 'M', '2013-11-20 15:33:57', NULL, 4, NULL, NULL, NULL, 'Be 3 25-2',
        'Cream', 'David Sutton', 'Test CC', 'Test SSI', 5.0000, 'Potency˙', 'Cabinet 1 Shelf A', 'Scott', '000000',
        NULL, '2013-11-20 16:09:35', '\rBe 3 25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
        NULL, NULL, NULL),
       ('Dexamethasone', 'Green slimy looking stuff', 'Sonicated in bath for 20 minutes. Mixed into 25 ml of water.',
        NULL, '06062013-19', 'Bellevue Pharmacy',
        'Cimetidine 5%/Deoxy-D-Glucose 1%/Ibuprofen 5%/Imiquimod 5%/Lidocaine 5%/Rentinoic Acid 1%/Tea Tree Oil 5% Cream',
        1, 'Be 3 25', 7, 'M121506431', 'P', NULL, 'M', '2013-11-20 15:33:57', NULL, 5, NULL, NULL, NULL, 'Be 3 25-3',
        'Cream', 'David Sutton', 'Test CC', 'Test SSI', 1.0000, 'Potency˙', 'Cabinet 1 Shelf A', 'Scott', NULL, NULL,
        '2013-11-20 15:52:25', '\rBe 3 25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
        NULL, NULL),
       ('Imiquimod', 'Green slimy looking stuff', 'Sonicated in bath for 20 minutes. Mixed into 25 ml of water.', NULL,
        '06062013-19', 'Bellevue Pharmacy',
        'Cimetidine 5%/Deoxy-D-Glucose 1%/Ibuprofen 5%/Imiquimod 5%/Lidocaine 5%/Rentinoic Acid 1%/Tea Tree Oil 5% Cream',
        1, 'Be 3 25', 7, 'M121506431', 'P', NULL, 'M', '2013-11-20 15:33:57', NULL, 6, NULL, NULL, NULL, 'Be 3 25-4',
        'Cream', 'David Sutton', 'Test CC', 'Test SSI', 5.0000, 'Potency˙', 'Cabinet 1 Shelf A', 'Scott', '000000',
        NULL, '2013-11-20 16:09:52', '\rBe 3 25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
        NULL, NULL, NULL),
       ('Lidocaine HCl', 'Green slimy looking stuff', 'Sonicated in bath for 20 minutes. Mixed into 25 ml of water.',
        NULL, '06062013-19', 'Bellevue Pharmacy',
        'Cimetidine 5%/Deoxy-D-Glucose 1%/Ibuprofen 5%/Imiquimod 5%/Lidocaine 5%/Rentinoic Acid 1%/Tea Tree Oil 5% Cream',
        1, 'Be 3 25', 7, 'M121506431', 'P', NULL, 'M', '2013-11-20 15:33:57', NULL, 7, NULL, NULL, NULL, 'Be 3 25-5',
        'Cream', 'David Sutton', 'Test CC', 'Test SSI', 5.0000, 'Potency˙', 'Cabinet 1 Shelf A', 'Scott', NULL, NULL,
        '2013-11-20 15:52:25', '\rBe 3 25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
        NULL, NULL),
       ('Ranitidine HCl', 'Green slimy looking stuff', 'Sonicated in bath for 20 minutes. Mixed into 25 ml of water.',
        NULL, '06062013-19', 'Bellevue Pharmacy',
        'Cimetidine 5%/Deoxy-D-Glucose 1%/Ibuprofen 5%/Imiquimod 5%/Lidocaine 5%/Rentinoic Acid 1%/Tea Tree Oil 5% Cream',
        1, 'Be 3 25', 7, 'M121506431', 'P', NULL, 'M', '2013-11-20 15:33:57', NULL, 8, NULL, NULL, NULL, 'Be 3 25-6',
        'Cream', 'David Sutton', 'Test CC', 'Test SSI', 1.0000, 'Potency˙', 'Cabinet 1 Shelf A', 'Scott', '000000',
        NULL, '2013-11-20 16:09:58', '\rBe 3 25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
        NULL, NULL, NULL),
       ('5-Fluorouracil', 'Green slimy looking stuff', 'Sonicated in bath for 20 minutes. Mixed into 25 ml of water.',
        NULL, '06062013-19', 'Bellevue Pharmacy',
        'Cimetidine 5%/Deoxy-D-Glucose 1%/Ibuprofen 5%/Imiquimod 5%/Lidocaine 5%/Rentinoic Acid 1%/Tea Tree Oil 5% Cream',
        1, 'Be 3 25', 7, 'M121506431', 'P', NULL, 'M', '2013-11-20 15:33:57', NULL, 9, NULL, NULL, NULL, 'Be 3 25-7',
        'Cream', 'David Sutton', 'Test CC', 'Test SSI', 5.0000, 'Potency˙', 'Cabinet 1 Shelf A', 'Scott', NULL, NULL,
        '2013-11-20 15:52:25', '\rBe 3 25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
        NULL, NULL),
       ('Colchicine', 'Greenish gray cream smells like socks', 'Dissolved in 50ML of water.', NULL, '10032013-102',
        'Bellevue Pharmacy', 'Collagenase 350U/GM', 1, 'Be 3 37', 8, 'S483469525', 'PESF', 'Good', 'S',
        '2013-11-22 14:03:16', NULL, 10, NULL, 'Meets potency requirements', NULL, 'Be 3 37', 'Cream', 'David Sutton',
        'Test SSI', 'Test SSI', 350.0000,
        'Potency˙\rFungi\rEndotoxin\rPool\rPotency-Stability\rSterility˙\rSterility-Validation', 'Freezer', 'Scott',
        'Colchicine', 'VXO', '2014-01-23 14:23:39', '10\rBe 3 37', 'Out', 350.000000, 1.000000, 9999.000000,
        10000.000000, 1.000000, 1.000000, 349.965000, 0.349965, 350.000000, 0.999900, 0.350000, 0.999900, NULL);

/*!40000 ALTER TABLE `methods`
    ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table standards
# ------------------------------------------------------------

DROP TABLE IF EXISTS `standards`;

CREATE TABLE `standards`
(
    `standardsDayBeforeExpire` int(10)      DEFAULT NULL,
    `standardsExpDate`         date         DEFAULT NULL,
    `standardsID`              int(10) NOT NULL AUTO_INCREMENT,
    `standardsLocation`        varchar(255) DEFAULT NULL,
    `standardsName`            varchar(255) DEFAULT NULL,
    `standardsNotes`           text,
    `standardsOrderedFrom`     varchar(255) DEFAULT NULL,
    `standardsStatus`          varchar(25)  DEFAULT NULL,
    `standardsUntilExp`        int(10)      DEFAULT NULL,
    PRIMARY KEY (`standardsID`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;



# Dump of table vendors
# ------------------------------------------------------------

DROP TABLE IF EXISTS `vendors`;

CREATE TABLE `vendors`
(
    `_placeholderGlobal` int(1)       DEFAULT NULL,
    `Address1`           varchar(255) DEFAULT NULL,
    `Address2`           varchar(255) DEFAULT NULL,
    `Cell Phone`         varchar(20)  DEFAULT NULL,
    `City`               varchar(255) DEFAULT NULL,
    `Comment`            text,
    `Company`            varchar(255) DEFAULT NULL,
    `Department`         varchar(255) DEFAULT NULL,
    `Direct Phone`       varchar(20)  DEFAULT NULL,
    `Email`              varchar(255) DEFAULT NULL,
    `Fax`                varchar(20)  DEFAULT NULL,
    `First Name`         varchar(255) DEFAULT NULL,
    `Last Name`          varchar(255) DEFAULT NULL,
    `Main Phone`         varchar(20)  DEFAULT NULL,
    `State`              varchar(2)   DEFAULT NULL,
    `VendorID`           int(7)       DEFAULT NULL,
    `VendorNumber`       varchar(255) DEFAULT NULL,
    `Website`            varchar(255) DEFAULT NULL,
    `Zip`                int(15)      DEFAULT NULL,
    `vendor_id`          int(7) unsigned NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`vendor_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors`
    DISABLE KEYS */;

INSERT INTO `vendors` (`_placeholderGlobal`, `Address1`, `Address2`, `Cell Phone`, `City`, `Comment`, `Company`,
                       `Department`, `Direct Phone`, `Email`, `Fax`, `First Name`, `Last Name`, `Main Phone`, `State`,
                       `VendorID`, `VendorNumber`, `Website`, `Zip`, `vendor_id`)
VALUES (0, '1724 Thurow St.', '', '8152174009', 'Sycamore', '', 'Digital eSolutions', 'IT', '', 'dsutton@desmail.com',
        '', 'David', 'Sutton', '224-402-5253', 'IL', 1005897, '', 'desmail.com', 60178, 1),
       (0, '2816 Hiwall Court', '', '', 'Castle Rock', '', 'Chromatography Institute of America', '', '(303)471-8015 ',
        '', '(303)471-8025', 'Ron', 'Sutton', '(800)788-9922', 'CO', 1006020, '', 'http://www.hplcinstitute.com', 80109,
        2),
       (0, '1 Infinity Loop', '', '', 'Cupertino', '', 'Apple, Inc.', 'Directors', '', '', '', 'Steve', 'Jobs', '',
        'CA', 1006143, '', 'www.apple.com', 90210, 3);

/*!40000 ALTER TABLE `vendors`
    ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
