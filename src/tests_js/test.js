var libqrl = require('./libjsqrl.js');
const crypto = require('crypto');
var assert = require('assert');


console.log("\n========== CREATE RANDOM SEED ========");

const seed_random = crypto.randomBytes(48);
// TODO: Provide automatic conversion between Nodejs Buffer and libqrl.VectorUChar [ std::vector<unsigned char> ]
seed_random2 = new libqrl.VectorUChar();
for(var i =0; i<48; i++)
{
    // Put some data
    seed_random2.push_back( seed_random[i] );
}

mnemonic_random = libqrl.bin2mnemonic(seed_random2);
console.log("Seed    : ", libqrl.bin2hstr(seed_random2));
console.log("Mnemonic: ", mnemonic_random);



console.log("\n========== CREATE FIXED SEED ========");
seed_in = new libqrl.VectorUChar();
for(i =0; i<48; i++)
{
    // Put some data
    seed_in.push_back(i);
}

mnemonic = libqrl.bin2mnemonic(seed_in);
console.log("Seed    : ", libqrl.bin2hstr(seed_in));
console.log("Mnemonic: ", mnemonic);
seed_out = libqrl.mnemonic2bin(mnemonic);

assert(libqrl.bin2hstr(seed_in) === libqrl.bin2hstr(seed_out), "Seeds after mnemonic conversion do not match");

tree_height = 4;
console.log("\n========== CREATE TREE ========");

known_address = "Q67b08ac802fc97ad513836296bdd4017d7c58352a36b517af02ec948ec326302753f2fc9";

xmss = new libqrl.Xmss(seed_in, tree_height);
console.log("Address : ", xmss.getAddress());
console.log("PK      : ", libqrl.bin2hstr(xmss.getPK()));
console.log("SK      : ", libqrl.bin2hstr(xmss.getSK()));
console.log("Seed    : ", libqrl.bin2hstr(xmss.getSeed()));
console.log("Height  : ", xmss.getHeight());
console.log("Index   : ", xmss.getIndex());

console.log("Root    : ", libqrl.bin2hstr(xmss.getRoot()));
console.log("PKSeed  : ", libqrl.bin2hstr(xmss.getPKSeed()));
console.log("SKSeed  : ", libqrl.bin2hstr(xmss.getSKSeed()));
console.log("SKPRF   : ", libqrl.bin2hstr(xmss.getSKPRF()));


assert(xmss.getAddress() === known_address, "ADDRESS DOES NOT MATCH");



console.log("\n========== PREPARE MESSAGE ========");
message_str = "This is a test message";

message_hstr = "5468697320697320612074657374206d657373616765"
signature1_known_hstr = "000000004c05b01a39c1daad3c6d7d9613a643022e39800766d452df9d31dd0da35ddb35a526d296f624ab22250939cbe709f0788ac3431391881476ff9765b7227e8c50933a5d1e4aa01aa2ef43a7ae170b1ba17e542248c5f7134c402b53138c5566b0be0ceaa5ebd96a525f949a37a68b4d477989a9e3a561dd928cd3b5fce34d673eae989bfb54cb4690d44c5bee8606fb12b13cd1c77f974c0c6a652ff3aef840491a57645acdb0b1f160b92514417fc5c6f487790d2f2372d1de32b1a37da33adced758350e2e21692667405c190ed434287c4618735979fdda2b0101cb8eda97bc7543645a37605497cddeb364011d8b50da45f0f77e81fd27a54b3cdd358a2ba893b49a7b64dad523b1298f39ed77f48a85d85b90631100af0daf3a5cf0830c374609a4ce5de4b4ffcce92b8031c37b2ad145c8e89e667a4b73d9f1543bbb8196263a3d105f8475398dcc8f85a5001a0b0c8c7f54ec17adbbd48ad35a959e2f4f814a75112d0a9f679aaac9013f85c328f3b47fa4b2401582364142fe10f6a2fb37856f6c2ba4037ce14db5c58623ecd9d3fb23da8f1d55c1b387550b107368a8b149425239510eacb66a7971da731d00722b106e5686c0ffe3fcdb128ece59a75ff6e2d1aa408eac8390b2e57c0dbcd41162698e7310f750eb7101422a568267ebf64a13b84d6fbe2a74b0f300d732f16f57ee3cf685f5e3c0899beb20a338581791dcd98956c4df70ff26443293d6eda0b6f681852445fbb52bb7b0e0a5f3d91c4745d049e63d8a79347ae4d651a3da307e99dbcc3005047e3160092f2b1d1fbceec5801506e08d1b9c56f50b0c89e7950e22d4cd2b81c25314386cd5c14d9539ff3d02539a6349c653d498bd9c7969d56df0405066e7ec471988c87ac8043e9471ccea27ca78e9516fae7e57eb5167c618d673d8cbe739b614a4b9d8e97bd25324a511a991268ee93bb43589ac0d3298f13aaaa19787fd7a97d65c37af08ca2a611337fd4ac19406602077455611a09947fc88d528938659eeeb99f36caf88e8d56233b2fb02e825a4da00cbd5a04447988971bff67e7404f5e148575aed5c94f9d61eb9264e432a45845e39bb49355eb70cb45f0a0857f74ea6d1d65a53e5f1620c7ead472064fd963776baf682fb55c9668e2642695e516181a80494e21ec59ddb06dcbcabb9e025f61df617d6695136fb84fc6ae994422f7fe2cc88f9bf467bfe1bad9769597aad9d59ba0a6c22a4ab287d24453ee0115b5b9115ca8d15c4aa7cff39d4b78c716e4f372628f301c10d1a7026b4ca0ba395fbc3b826f883a9567b5c074342fb296f9fd073ccd83b78a7f69e515aaad764b73056ea3b98dc11fd076e11a91979978b10c23b9b100f8e80f80b215bbaa4164b10e0897d93e1a50473a22d237f533a33717268065d76c85d1771eb2cda0b33ff30114faf89703f5860a2ba8986dc8a3695eed2bba62879dc44adf6bd1635f7cfaefbeba094c7173f6711dfb634006beb0e0a77eaacd2e44ccc3402ee248c4a4a4c6f0780f09a71ece9b5de26138ca74835315d247aa4225c5a9292c19dcdc51fe27eef0c1bbe1f14eca1ef2d24e1190444978aa92919199f838dd484738a59bd3305b426f8b4c848ca11f115ac631e042d5a4986efac85710e94b6570b57abf8e14d996a13393154943578c147f3c5cf8f1544b699a4d36cce7e50de2391f6ae7173a1dd8d1f05687b92326baa6259179d8c0bb60ef2ae804fc07ae8e0f3c4c94a1be128be74ac38a7ea36faf61030d025d1e8e527769a1ce21f89ba0a997c7fd716b74683e678f90a20c6c5ddb9513fc696f269803e21b913ed4819b15f7962e4dc647d0ad4f817fd9e6d604e64f382d39407bbe8ad6a197151c54467691035e459bbed25a9a35161db4a07398818f23f83410e89a61e4e8ce3cd6c9837d081c52e344f4ec0c2cc9812687aa5c6baee1a307c5aff76609c4ff4b0bb7244b866015d46e142417d1b498015a11c8a3b3698f49869296f5f61c308af9e395a916418ff1da8b33702f7f80cb4b6b1b4f68aab219022b3e1983e64a9b94919eaf283e5ca37bd51c64e4c28e3b721582c4178c5262264a114233e8548fb42e5c4e6a8501a6f31cb873fd9eff21d4a587f0415af8349f9729c5b2061b3947443d300bbfd2053eb3f8722bfcc513ebc6fda66a9f0b2d5df56e681ac6c6fd4606da7edf2256b131f6d28835a9368a1190b81f1f7aae0f630e537d1984c6d22c24157ba5b4823f90efaa5c1cde59501351e96e2866fe7d13cacedca66726da9d419505c23c94fa220634a7f329c7708fb1d4d6ea5283dd7ec0d076d93538047ed531c5351796134c3b00c8316cff76652d159cad9c951d16eeac9d1cdf07eb26215e1f0971821de7832855505225df608beef4af9d81334330dcdeee51c3f78a2caf64d889c5aca839ad4941bfa0f217b506703711bd5f7c70f716f0ae7b0013db9de6f47449c5e9883dae394fbf842e80697bfa69f9c30895dd58ac44ba1b7e45f988f0d95259cc58f537f31dd465587aba80bd54e1a34b2e1bcf6b70345e5b28b223057d889369774db37dd77aa2e90e89642e2d47a7fed0fc9298355034e28fbb1dd1ccbe1b22f60b8c31c36635105ff4dd69bf9793415389fe5051dab296667f517c889806c8b633041be3e750714831a996eb6a442459231e04916e09ddbf4af1e78de40ba57c3c05633eda3da57ccde811d9c1765420e213611b5a544bb231dfd90bb1cf1b351857f499cf7b7f86beb78266ccb62d4f92b791fd66c2afc018068129321911431f3b16824c1abcf66b8f01e0a5e61152acee229174fb0e34425ec168c6b475c84dd6cb852e12b6d1905cfe907873615a508e81c64cde0cf6df37bf80f71f8bc4e79a24c3507ec7f80bfd0263b466dbbdadea18de21fe7571454abb0f03fb0ea7560d7dad7b3d8c75931e337c54843965e5f888ab05428849c6ec28624db89961041d5ac178f928371abba40db39457db29c248bfb3de2eff322ff6eda98c3695c379ddc11c56ff01f08e68826a379c12954140febf7b2de4dcc119accf23a95b477ad3d08b0151778f45418fb24b4b83170bb48ebc3128600c3be554b2e122165afe3ae34dac6486e03b8e2baa1616b58e72ce38a65274db488246ed68a70b294928da27ef9b24ee592c723d91a02d23ee960072cc5fc1220bc78f7867e3286722fef6edef3f0ce090450041db3cadab736f254b68bf7ad63c7085789c2b651a94";

signature2_known_hstr = "00000001fef8018b2189071448c2fe98452154a375ca0b17a022241e9f41e164e0c07b54ed8c2d9cf20b82673354f30421296048e3bcb924be528121da929e6476a431a717d9fe4a83dffff1eded12b65ac77fc7f52592180de42d760beadb61dba1a2554ed5d6e706af55ae15ceefd9f79b8cf29f039c0c9e1f42c155964a7a9ed26fadb4440f4d3a2417694850d556a5e0d01e573121321252ae69b86efb393217d60da1e63e82f18ee0bc9090417a0d12be6328deadca0f6705d10b30d21dc0d625c92ce4c3bd2d80cf8c43fc1fec330fa6349fd808017df24fc04ce283106f5b5c8d1097f482aa218c726070a5910ad104e7da646206b3d58838836d045ed06db9d1543f83b967ada6163e69d6a392c570f115e9e1df6dbe5523e31166a8e68e7020a176bdead8968f37094119a8148705c5259ed9777de63db4e5cc17b731548acd16bd99d02480bfafc1fa979f68fe4af98809e96bf5a8e7879e53abb91e74e70c90f8323c6980412611d893ef8981117259a800ab8f5606975b1757befd01c8d94a183801814071c49a3235fbb7cd6510f5a9c90683cec13b42d25e4ae475e801b5991275755517fed9175618b95e39f7f4857203463205a8b12999699f44bbafae14d9c51d4fb25b01208cd04a084f2f6f5d7c23a2940d581f606d74621f561f91ed46f96ecc742b0773b1c0551995fae26f937a4e2c9474433680855c5fad6d3e837bff7c0accaac60344c915f567b7aeff23649e478f913d8e7c252988441acea0f106b89204e7fe91b957b615e3b1497827b2fb61ee1142f57bf80aa45472713bf81ec616f86d78e27768dcb7a2b7209e8c2f6400a8cd113d36e58e6ecfedd69b68d8a3e685e38ee36b8179484e05132e0d7a5e6656b75c179b26ad70430b4b0ef68ab96a9024b00ed64fe6f1210871880f1cf4247afa381a02be9c7bbbab9c860e6a6d59171167884ac5d73fca8eb0b6253c2008eba6f4811f387f06d7843e96875386c104001f9ba0922592847e2eb60145d61449253dd046f21553a5fe693adefc5aa1b1a5e9f4e3d8fe48bb86cdd4e98028240f0c6877593a3993c6415673879d617eda983500ab7b5e36f8e9e3eed104c10783a90b35789428b20b75bcc6fe4dcd05b281bc7610e3ea213afba88c5169a7c86ad00d67b0d94f2aec5fb6ef44fb307189f4469668e04d12bb9622e3fb09228320484c4308af19ec9c577494c67c949b3fba1fba28964ff8f884e3403d58bc7289027e119508115075c53810a804d11ebc24f27a8faf5a0f75d1473c340c104f3845bb5327b37ea021dd3f6ad5f4a37916a2846957f6c39a40b19242e0a2cec5fb7ff43695d8f14d80fdd5206787edd151516f519657893d9d3a1d006ef0d28401913ac02bc9bae493f1a9a3f9c9fe4b9224293f4e425f0ed6f5f11cd06be601c331bcd2df70e3ec5d82a6fec3967dcc0022d1833fa25fb45fef232cacb210317e8ed009c26507454c34edddeb3ab8ddd865f996d745c1ca0dd7dcd20f4532150c357a95d28e6139bb73ddf8aa5d69b438206c64ec3f2e65d0273cce9dd49baf91ebf2b3659f1c876bf0a729592374f99ed543f5545c5a487c0044ba37a6b5d12b45445cfe5624241a136d3f19e2c04d8bcc7db95fcb86ecc2ecc2f7205ed3709237cc8fc8304bf584cb4e0734f9ee1a389dfd5ed13ea377776cc588ec46b8335b7e00b3cb55a9d82a42ccb6a5978e3223fca7a5aa1e3ae65b78a3738159e5b5cb9379aceff0418e4ddca22c85e55b1abc7da76fda02c57e30b03a295c1e4b654eb5cb678e3853e1cbe8c07ace0b2e15f3d8dc1ba59db936ee74172076db7bf76dff27d55538261dff86b65ee39ff51d5f9755cbee7bcb82b25df626b14b42ceb787184a14069a1fa080d24d629793efb261cb0d366e9ab036577d7e72d357e169a6854378a7619ddb8a8e89e2f67c94f5ebe0937b6c639ece114a40de31fac55bd9df095db2620cf8994d6c7db6c7bb058b2aa7d19c619124aef735b7c1a50318af3fd05d19f14683cfee0997bf20cf9a1c32494fbde96cc35416b31a52319380d6746ad525e907be03dc5d24c791c78b589d4010ddbd5b25ab9b0883c98706ddbde9b93f992c67848fa4648d4fe0cf28b95148ce78abf99dbccd03e97c3deb0fc3762b8d606584d4ae6a777c7930ae7366c05e1d07ebde0e92ef8b544b15e6933298e790f87305a9d28e57e1f206c6c7b645b36731adc71f7b17dd55a231a46c146f8afdca222dcd829940685878e6244760f3e0350b647e75d8f53d36acd292e9bc4eb7e04a48a851d4b4bcf64cc8adc67011f1a04db38278b63a0c575221136db4f59194929c262e470cebcdf2323f91e9fe9d6a7f8e57a1cc4a2529957bea4f26e5af6837c5c38df64497525301466bcd86bef8eda9b751a05bea63559db8c58cbd00e67895b9b316bf7b258ea37841867191a1c7c14f7d1cb650e61bc5b02c8272402469b3d9b5df2f526db5b9828734622ef492b3f7a6dd8f5b27f8191c6c5389c1146ba3f22ea7ac91ca6a634b1249ed49dad63fc9b0e8f612ac384f48f8a2b414419bd940d0ccbb106f1e527a64a76ca328284ee7905a2ed5f3a86212fef94e3e823d68ec672e01ad10776dfaae35df787c88a314a73aba97a3e03a467a56b4c0c80921bc534368933ae6b1227dca177127d061ceda52b8ec85261bf714c63da1d785f6931f8f80c01dba151e567f6dcfaf9a3b57bc3abdfc89435e5a47543ec7c430d0df86313f9c8f40087e95765b8c94f561203727e393bc9970330768a89401f4f2fb4b123a6c6160f4a6a68070bc0ac10bb8c888e9f70eb741583e7f8c7d120fe4b1188209f1f2650a6b01c057097b4925a3b3401f5137fd6fca6df01889b9c634946d7b5cd3b8f8815b715c08fa6e590a271a5b68ec44580fec18a726d4d3d73f66fa85aa4a0f316544f6db8e36756e89e6b2f92c96bffbf690ab10c5e6b484726f2bf0d6e4051348b568d83f02d89a53159b0f48ff0421ce645303a1ff54397fa621b610ef2e6314f7ba6721fb3ac89039a0f6745adc574325f1ff11833f4ce9b71b6baab172a7835b21d49baada73d36f0676d8b9da6cb12d481631d3084e2170eafe3ae34dac6486e03b8e2baa1616b58e72ce38a65274db488246ed68a70b294928da27ef9b24ee592c723d91a02d23ee960072cc5fc1220bc78f7867e3286722fef6edef3f0ce090450041db3cadab736f254b68bf7ad63c7085789c2b651a94";

pk_known_hstr = "16ecb9f39b9f4275d5a49e232346a15ae2fa8c50a2927daeac189b8c5f2d18bc4e3983bd564298c49ae2e7fa6e28d4b954d8cd59398f1225b08d6144854aee0e";
sk_known_hstr = "000000000c459bb1b4d1cd8cdec0209f37d4c91597896ce8de0911bd021db47029d70dc332ad39708e20dfe28f325b63beffe4f841aa834d46f740d3d988a3bcef678de74e3983bd564298c49ae2e7fa6e28d4b954d8cd59398f1225b08d6144854aee0e16ecb9f39b9f4275d5a49e232346a15ae2fa8c50a2927daeac189b8c5f2d18bc";

msg_in = new libqrl.str2bin(message_str);
console.log("Message: ", libqrl.bin2hstr(msg_in));
sigpk = xmss.getPK();
sigsk = xmss.getSK();
sigheight = xmss.getHeight();

assert(libqrl.bin2hstr(sigpk) === pk_known_hstr, "PK DOES NOT MATCH");
assert(libqrl.bin2hstr(sigsk) === sk_known_hstr, "SK DOES NOT MATCH");
assert(libqrl.bin2hstr(msg_in) === message_hstr, "MSG DOES NOT MATCH");


console.log("\n========== FIRST SIGNATURE ========");
console.log("Index  : ", xmss.getIndex());
signature1 = xmss.sign(msg_in);
console.log("Sig1   : ", libqrl.bin2hstr(signature1));
assert(libqrl.bin2hstr(signature1) === signature1_known_hstr, "SIGNATURE DOES NOT MATCH");


console.log("\n========== SECOND SIGNATURE ========");
console.log("Index  : ", xmss.getIndex());
signature2 = xmss.sign(msg_in);
console.log("Sig2   : ", libqrl.bin2hstr(signature2));
assert(libqrl.bin2hstr(signature2) === signature2_known_hstr, "SIGNATURE DOES NOT MATCH");

console.log("\n========== VERIFY SIGNATURE ========");

verification1 = libqrl.Xmss.verify(msg_in, signature1, sigpk);
verification2 = libqrl.Xmss.verify(msg_in, signature2, sigpk);

console.log("Verif1      : ", verification1);
console.log("Verif2      : ", verification2);
