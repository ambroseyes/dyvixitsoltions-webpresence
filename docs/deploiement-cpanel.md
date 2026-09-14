# Déployer le site sur cPanel depuis GitHub

Guide pas à pas, pensé pour une première mise en ligne. Comptez 30 à 45 minutes.

Le site est une application **Next.js** : ce n'est pas un ensemble de pages HTML qu'on
dépose dans `public_html`, mais un petit serveur **Node.js** qui fabrique les pages à
la demande (formulaire de contact, sécurité, version française et anglaise). cPanel
sait faire tourner ce type d'application, à condition que votre offre le permette.

---

## 0. Vérifier que votre hébergement le permet

Connectez-vous à cPanel et cherchez ces outils (barre de recherche en haut) :

| Outil cPanel                                            | Indispensable ?       | À quoi il sert                   |
| ------------------------------------------------------- | --------------------- | -------------------------------- |
| **Setup Node.js App** (parfois « Application Node.js ») | **Oui**               | Faire tourner le serveur du site |
| **Git™ Version Control**                                | Oui                   | Récupérer le code depuis GitHub  |
| **Terminal**                                            | Oui (ou un accès SSH) | Installer et compiler le site    |

- **Pas de « Setup Node.js App » ?** Votre offre ne peut pas faire tourner ce site.
  Demandez à votre hébergeur une offre « avec Node.js », ou changez d'hébergement.
- **Version de Node.js** : il faut **20.9 ou plus récent** (choisissez 22 si elle est
  proposée).
- **Pas de Terminal ?** Demandez à l'hébergeur d'activer l'accès SSH ou le Terminal.

---

## 1. Choisir ce que vous déployez

- On déploie toujours la branche **`master`** : c'est la version validée du site.
- Pour essayer une version sans toucher au site en ligne, déployez-la d'abord sur un
  **sous-domaine de test** (par exemple `test.dyvixitsolutions.com`).
- Pour remplacer l'ancien site sur `dyvixitsolutions.com`, allez directement à
  l'étape 6 : elle vous renvoie aux autres étapes au bon moment.

---

## 2. Récupérer le code depuis GitHub

cPanel → **Git™ Version Control** → **Create**, puis remplissez :

| Champ              | Valeur                                                          |
| ------------------ | --------------------------------------------------------------- |
| Clone a Repository | activé                                                          |
| Clone URL          | `https://github.com/ambroseyes/dyvixitsoltions-webpresence.git` |
| Repository Path    | `dyvix-site`                                                    |
| Repository Name    | `dyvix-site`                                                    |

Cliquez sur **Create**. Le dépôt étant public, aucun mot de passe n'est demandé.

- Le dossier `dyvix-site` est créé dans votre répertoire personnel, **en dehors de
  `public_html`**. C'est voulu : le code ne doit pas être accessible directement depuis
  le web.
- Pour changer de branche : **Manage** → **Basic Information** → **Checked-Out Branch**.

---

## 3. Créer l'application Node.js

cPanel → **Setup Node.js App** → **Create Application** :

| Champ                    | Valeur                                        |
| ------------------------ | --------------------------------------------- |
| Node.js version          | 22.x (ou au minimum 20.9)                     |
| Application mode         | Production                                    |
| Application root         | `dyvix-site` (le même dossier qu'à l'étape 2) |
| Application URL          | votre domaine ou sous-domaine                 |
| Application startup file | `.next/standalone/server.js`                  |

Cliquez sur **Create**. En haut de la page de l'application, cPanel affiche une
commande qui commence par `source /home/...`. **Copiez-la** : elle sert à l'étape
suivante.

> Si cPanel crée un fichier d'exemple « It works! » au chemin indiqué, c'est normal :
> la compilation de l'étape 4 le remplacera.

---

## 4. Installer et compiler le site

cPanel → **Terminal**. Collez la commande copiée à l'étape 3. Elle ressemble à
ceci, avec votre nom d'utilisateur à la place de `VOTRE_UTILISATEUR` :

```bash
source /home/VOTRE_UTILISATEUR/nodevenv/dyvix-site/22/bin/activate && cd /home/VOTRE_UTILISATEUR/dyvix-site
```

Puis lancez, l'une après l'autre :

```bash
npm install --include=dev
```

```bash
npm run build
```

- La première commande installe les outils nécessaires. Elle prend quelques minutes.
- La seconde compile le site et prépare le dossier `.next/standalone`. Les fichiers
  statiques y sont copiés automatiquement. À la fin, vous devez lire
  `[standalone] copied .next/static and public/ into .next/standalone`.

---

## 5. Démarrer et vérifier

1. **Setup Node.js App** → cliquez sur **Restart** à côté de votre application.
2. Ouvrez votre domaine : la page d'accueil en anglais doit s'afficher.
3. Ouvrez `https://votre-domaine/fr` : la version française doit s'afficher.
4. **Certificat HTTPS** : cPanel → **SSL/TLS Status** → lancez **AutoSSL** si le
   cadenas n'apparaît pas.

---

## 6. Mettre le site sur le domaine principal (remplacer l'ancien site)

Aujourd'hui, `dyvixitsolutions.com` affiche l'ancien site : une application React
statique, c'est-à-dire de simples fichiers posés dans `public_html`, **sans base de
données**. Voici comment le remplacer sans rien perdre.

> Rien ici ne touche à vos **e-mails** `@dyvixitsolutions.com`. Ne supprimez ni le
> domaine, ni les comptes e-mail, ni la zone DNS : on ne déplace que les fichiers du site.

### 6.1 Sauvegarder l'ancien site

1. cPanel → **Gestionnaire de fichiers** (File Manager) → ouvrez `public_html`.
2. En haut à droite : **Paramètres** → cochez **Afficher les fichiers cachés** →
   **Save**.
3. Sélectionnez les fichiers de l'ancien site (liste ci-dessous) → **Compresser** →
   format Zip → nom `ancien-site.zip`.
4. Téléchargez `ancien-site.zip` sur votre ordinateur.

Fichiers de l'ancien site : `index.html`, le dossier `static`, `manifest.json`,
`asset-manifest.json`, `favicon.ico`, `style.css`, `robots.txt`, `.htaccess`, et les
éventuelles images `logo…`.

### 6.2 Repérer les dossiers de vos sous-domaines

cPanel → **Domaines** : regardez la colonne **Racine du document** (Document Root).
Si un sous-domaine a son dossier _dans_ `public_html` (par exemple
`public_html/test`), **ne déplacez pas ce dossier** : il appartient à ce sous-domaine.

### 6.3 Préparer la nouvelle version (l'ancien site reste en ligne)

La compilation prend plusieurs minutes. Faites-la maintenant : l'ancien site reste
visible pendant ce temps, et la coupure se limitera ensuite à quelques minutes.

- **L'application Node.js tourne déjà sur un sous-domaine** : suivez « Mettre à jour
  le site après une modification » (récupérer, compiler, **Restart**), puis vérifiez
  le nouveau site sur ce sous-domaine.
- **Pas encore d'application** : faites les étapes 2 à 5 avec un sous-domaine de test
  (par exemple `test.dyvixitsolutions.com`), puis vérifiez le site dessus.

### 6.4 Sortir l'ancien site de `public_html`

1. Dans le Gestionnaire de fichiers, créez un dossier `ancien-site` dans votre
   répertoire personnel, au même niveau que `public_html` (pas dedans).
2. Déplacez-y les fichiers de l'ancien site listés en 6.1. **Déplacez, ne supprimez
   pas** : c'est ce qui permet de revenir en arrière.
3. Laissez en place `.well-known`, `cgi-bin` et les dossiers de sous-domaines.

Pourquoi ne pas simplement installer le nouveau site par-dessus ? Tant qu'un
`index.html` reste dans `public_html`, le serveur l'affiche en priorité : l'ancien
site masquerait le nouveau.

À partir d'ici, `dyvixitsolutions.com` affiche une page vide ou une erreur jusqu'à
la fin de l'étape 6.5 : enchaînez sans attendre.

### 6.5 Brancher l'application sur le domaine principal

- **Setup Node.js App** → crayon (modifier) sur votre application → **Application
  URL** : choisissez `dyvixitsolutions.com` et laissez le chemin vide → **Save**,
  puis **Restart**.
- Si cPanel refuse la modification : supprimez l'application (icône corbeille : cela
  ne supprime que le réglage, pas vos fichiers), recréez-la comme à l'étape 3 avec
  `dyvixitsolutions.com`, puis **Restart**. Si « It works! » s'affiche, refaites
  l'étape 4, puis **Restart**.

### 6.6 Forcer le HTTPS

cPanel → **Domaines** → activez **Force HTTPS Redirect** pour `dyvixitsolutions.com`.
Le site redirige lui-même `www.dyvixitsolutions.com` vers `dyvixitsolutions.com`.

Puis cPanel → **SSL/TLS Status** : chaque domaine et sous-domaine doit avoir un
cadenas vert. Sinon, cliquez sur **Run AutoSSL**. C'est important : le nouveau site
demande aux navigateurs d'utiliser le HTTPS pour le domaine **et tous ses
sous-domaines**. Un sous-domaine sans certificat ne s'ouvrirait plus chez les
visiteurs du site.

### 6.7 Vérifier

Dans une fenêtre de navigation privée, ouvrez :

- `https://dyvixitsolutions.com` : le nouveau site en anglais ;
- `https://dyvixitsolutions.com/fr` : la version française ;
- `http://dyvixitsolutions.com` : doit basculer en `https` ;
- `https://www.dyvixitsolutions.com` : doit basculer sans `www`.

### En cas de souci : revenir à l'ancien site

1. **Setup Node.js App** → supprimez l'application du domaine principal (icône
   corbeille : vos fichiers restent dans `dyvix-site`).
2. Remettez le contenu du dossier `ancien-site` dans `public_html`.

L'ancien site revient aussitôt. Gardez `ancien-site` et `ancien-site.zip` quelques
semaines avant de les supprimer.

---

## 7. Recevoir les demandes du formulaire par e-mail

Chaque demande envoyée depuis le formulaire de contact arrive par e-mail à
`contact@dyvixitsolutions.com`. Le site l'envoie depuis une boîte mail dédiée de
votre cPanel : aucun service extérieur n'est nécessaire.

Tant que ce réglage n'est pas fait, le formulaire dit aux visiteurs que leur demande
n'a pas pu être envoyée et les invite à vous écrire directement. Aucune demande ne
se perd sans prévenir.

### 7.1 Créer la boîte d'envoi

1. cPanel → **Comptes de messagerie** (Email Accounts) → **Créer**.
2. Nom d'utilisateur : `site`. L'adresse devient `site@dyvixitsolutions.com`.
3. Mot de passe : cliquez sur **Générer**, puis copiez-le dans un endroit sûr (un
   gestionnaire de mots de passe, par exemple).
4. Cliquez sur **Créer**.

### 7.2 Relever les réglages d'envoi

Sur la ligne de `site@dyvixitsolutions.com`, cliquez sur **Connect Devices**
(Connecter des appareils). Dans le cadre **Paramètres SSL/TLS sécurisés
(recommandé)**, notez :

- le **serveur sortant** (Outgoing Server), souvent `mail.dyvixitsolutions.com` ;
- le **port SMTP**, souvent `465`.

### 7.3 Donner ces réglages au site

cPanel → **Setup Node.js App** → crayon (modifier) sur l'application →
**Environment variables** → **Add Variable**, une variable à la fois. Recopiez les
noms exactement, en majuscules :

| Nom                | Valeur                                                                   |
| ------------------ | ------------------------------------------------------------------------ |
| `SMTP_HOST`        | le serveur sortant noté en 7.2                                           |
| `SMTP_PORT`        | le port noté en 7.2 (`465` en général)                                   |
| `SMTP_USER`        | `site@dyvixitsolutions.com`                                              |
| `SMTP_PASS`        | le mot de passe de la boîte `site@`                                      |
| `ENQUIRY_TO_EMAIL` | facultatif : une autre adresse que `contact@` pour recevoir les demandes |

Cliquez sur **Save**, puis sur **Restart**. Inutile de recompiler.

> Le mot de passe ne va **que** là : jamais dans le code, jamais sur GitHub.

### 7.4 Tester

1. Envoyez une demande depuis `https://dyvixitsolutions.com/contact`.
2. Elle arrive dans la boîte `contact@` en quelques secondes, avec la même
   référence `DYX-…` que celle affichée au visiteur.
3. Cliquez sur **Répondre** : votre réponse part directement au visiteur.

Si le formulaire affiche « Votre demande n'a pas pu être envoyée », ouvrez le
fichier `stderr.log` du dossier `dyvix-site` (Gestionnaire de fichiers). La dernière
ligne qui commence par `[enquiry]` en donne la cause :

| La ligne contient                       | Solution                                                                                     |
| --------------------------------------- | -------------------------------------------------------------------------------------------- |
| `mail is not configured`                | Une variable manque ou son nom est mal écrit (elle est citée) : revoir 7.3, puis **Restart** |
| `EAUTH`                                 | Adresse ou mot de passe incorrects dans `SMTP_USER` ou `SMTP_PASS`                           |
| `ESOCKET`, `ECONNECTION` ou `ETIMEDOUT` | Serveur ou port incorrects : revoir 7.2 ; si `465` ne passe pas, essayer `587`               |

---

## Mettre à jour le site après une modification

À chaque nouvelle version poussée sur GitHub :

1. **Git™ Version Control** → **Manage** → **Pull or Deploy** → **Update from Remote**.
2. **Terminal** : recollez la commande `source ... && cd ...`, puis :

   ```bash
   npm install --include=dev
   ```

   ```bash
   npm run build
   ```

3. **Setup Node.js App** → **Restart**.

---

## En cas de problème

| Ce que vous voyez                                             | Cause probable                                                                       | Solution                                                                                                      |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Une page « It works! »                                        | Le site n'a pas été compilé, ou l'application n'a pas été redémarrée                 | Refaire les étapes 4 et 5                                                                                     |
| La compilation s'arrête avec `Killed` ou `heap out of memory` | Pas assez de mémoire sur l'offre mutualisée                                          | Demander plus de mémoire à l'hébergeur, ou compiler ailleurs (voir ci-dessous)                                |
| Erreur 503 ou page blanche                                    | L'application a planté au démarrage                                                  | Lire le journal d'erreurs (fichier `stderr.log` dans `dyvix-site`), puis **Restart**                          |
| L'ancienne version s'affiche encore                           | Mise à jour récupérée mais non compilée                                              | `npm run build`, puis **Restart**                                                                             |
| L'ancien site s'affiche toujours sur le domaine principal     | Un fichier de l'ancien site (`index.html`, `.htaccess`) est resté dans `public_html` | Le déplacer dans `ancien-site` (étape 6.4), puis recharger la page                                            |
| cPanel signale un problème de dossier `node_modules`          | Conflit entre l'outil Node.js de cPanel et l'installation manuelle                   | Supprimer le dossier `node_modules` de `dyvix-site` (pas celui de `.next/standalone`), puis refaire l'étape 4 |

### Si votre hébergement ne peut pas compiler le site

Sur les petites offres, la compilation peut manquer de mémoire. Dans ce cas, on
compile ailleurs et on n'envoie sur cPanel que le résultat, le dossier
`.next/standalone`, qui n'a besoin ni d'installation ni de compilation sur le serveur.
Cela peut être automatisé avec GitHub Actions. Il faudra alors enregistrer, dans les
réglages GitHub du dépôt, les identifiants FTP ou SSH de votre hébergement.

---

## Ce qui n'est pas encore branché

- **Générateur de cahier des charges** : en préparation. Sa partie IA aura besoin
  d'une clé API Anthropic, à placer dans **Setup Node.js App** → **Environment
  variables**, comme les réglages d'e-mail de l'étape 7. Jamais dans le code.
