# 🔐 Explication : Vérification du rôle utilisateur dans Actualite.jsx

## 📋 Vue d'ensemble

Cette partie du code vérifie si l'utilisateur connecté est un **administrateur** pour décider d'afficher ou non le bouton "➕ Créer une actualité".

---

## 🔍 ÉTAPE PAR ÉTAPE

### 1️⃣ Récupération du token JWT

```javascript
const token = localStorage.getItem("token");
```

**Qu'est-ce qu'un token JWT ?**
- JWT = JSON Web Token
- C'est comme une "carte d'identité numérique" créée lors de la connexion
- Stocké dans le localStorage du navigateur
- Contient des informations sur l'utilisateur (id, email, rôle, etc.)

**Pourquoi dans localStorage ?**
- Le localStorage garde les données même après fermeture du navigateur
- Permet de rester connecté entre les sessions

---

### 2️⃣ Structure d'un JWT

Un JWT est composé de **3 parties** séparées par des points :

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDEyMzQ1IiwibmFtZSI6IkpvaG4iLCJyb2xlIjoiYWRtaW4ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        HEADER (en-tête)                           PAYLOAD (données)                                  SIGNATURE
```

**Les 3 parties :**

1. **HEADER** (en-tête) : Type de token et algorithme de chiffrement
2. **PAYLOAD** (charge utile) : **LES DONNÉES UTILISATEUR** ← C'est ce qui nous intéresse !
3. **SIGNATURE** : Vérification de l'authenticité du token

---

### 3️⃣ Extraction du PAYLOAD

```javascript
const payloadBase64 = token.split(".")[1];
```

**Ce que fait ce code :**
1. `token.split(".")` → Coupe le token en 3 parties : `[header, payload, signature]`
2. `[1]` → Prend la 2ème partie (index 1) = le PAYLOAD
3. Le payload est encodé en **base64** (format de codage)

**Exemple :**
```javascript
// Token complet
"header.eyJpZCI6IjEyMyIsInJvbGUiOiJhZG1pbiJ9.signature"

// Après split(".")[1]
"eyJpZCI6IjEyMyIsInJvbGUiOiJhZG1pbiJ9"  // ← payload en base64
```

---

### 4️⃣ Décodage du PAYLOAD

```javascript
const decodedPayload = JSON.parse(atob(payloadBase64));
```

**2 opérations importantes :**

#### a) `atob()` - Décoder le base64
- **atob** = "ASCII to Binary" (base64 vers texte)
- Transforme le code incompréhensible en JSON lisible

**Exemple :**
```javascript
// Avant atob()
"eyJpZCI6IjEyMyIsInJvbGUiOiJhZG1pbiJ9"

// Après atob()
'{"id":"123","role":"admin"}'  // ← JSON en format texte
```

#### b) `JSON.parse()` - Convertir en objet JavaScript
- Transforme la chaîne JSON en objet JavaScript utilisable

**Exemple :**
```javascript
// Avant JSON.parse()
'{"id":"123","role":"admin"}'  // Chaîne de caractères

// Après JSON.parse()
{ id: "123", role: "admin" }  // Objet JavaScript
```

---

### 5️⃣ Extraction du rôle

```javascript
setUserRole(decodedPayload.role);
```

**Ce qui se passe :**
1. On récupère la propriété `role` de l'objet
2. On la stocke dans l'état React `userRole`

**Exemple de payload décodé :**
```javascript
{
  id: "670123456789",
  email: "admin@petanque85.fr",
  nom: "Dupont",
  prenom: "Marie",
  role: "admin"  // ← C'est cette valeur qu'on récupère !
}
```

---

### 6️⃣ Gestion des erreurs

```javascript
catch (error) {
  console.error("Erreur décodage JWT :", error);
}
```

**Pourquoi un try/catch ?**
- Le token peut être corrompu ou invalide
- Le décodage peut échouer
- Sans gestion d'erreur, l'application planterait

**Que se passe-t-il en cas d'erreur ?**
- L'erreur est affichée dans la console
- `userRole` reste `null`
- Le bouton admin ne s'affiche pas (sécurité)

---

## 🎯 UTILISATION DANS LE JSX

```javascript
{userRole === "admin" && (
  <Link to="/actualite/new">
    ➕ Créer une actualité
  </Link>
)}
```

**Syntaxe React : Rendu conditionnel**

La syntaxe `{condition && <Element />}` signifie :
- Si `condition` est **true** → affiche `<Element />`
- Si `condition` est **false** → n'affiche **rien**

**Dans notre cas :**

| Situation | userRole | Condition | Résultat |
|-----------|----------|-----------|----------|
| Admin connecté | `"admin"` | `"admin" === "admin"` → **true** | ✅ Bouton affiché |
| Utilisateur normal | `"user"` | `"user" === "admin"` → **false** | ❌ Bouton caché |
| Non connecté | `null` | `null === "admin"` → **false** | ❌ Bouton caché |

---

## 🔄 FLUX COMPLET

```
1. Page Actualite.jsx se charge
   ↓
2. useEffect() s'exécute
   ↓
3. Récupération du token depuis localStorage
   ↓
4. Découpage du token en 3 parties
   ↓
5. Extraction du payload (partie [1])
   ↓
6. Décodage base64 → JSON
   ↓
7. Conversion JSON → objet JavaScript
   ↓
8. Extraction du rôle : decodedPayload.role
   ↓
9. Stockage dans userRole (useState)
   ↓
10. React re-rend le composant
   ↓
11. Vérification : userRole === "admin" ?
    ↓                     ↓
   OUI                   NON
    ↓                     ↓
Bouton visible      Bouton caché
```

---

## 💡 POURQUOI CETTE APPROCHE ?

### ✅ Avantages

1. **Sécurité frontend** : Cache les options admin aux non-admins
2. **Expérience utilisateur** : Interface adaptée au rôle
3. **Pas de requête API** : Info disponible dans le token (rapide)
4. **Décodage côté client** : Pas besoin de redemander au serveur

### ⚠️ Important

**Cette vérification est COSMÉTIQUE (interface seulement) !**

La vraie sécurité doit être **sur le backend** :
- Routes protégées avec middleware d'authentification
- Vérification du rôle côté serveur avant chaque action
- Même si on cache le bouton, quelqu'un pourrait appeler l'API directement

**Le frontend cache le bouton = confort utilisateur**  
**Le backend refuse l'accès = vraie sécurité** 🔒

---

## 🧪 EXEMPLE COMPLET

```javascript
// AVANT connexion (pas de token)
localStorage.getItem("token") // null
userRole // null
→ Bouton admin CACHÉ

// APRÈS connexion admin
localStorage.getItem("token") // "eyJhbG...xyz"
// Décodage...
userRole // "admin"
→ Bouton admin VISIBLE

// APRÈS connexion utilisateur normal
localStorage.getItem("token") // "eyJhbG...abc"
// Décodage...
userRole // "user"
→ Bouton admin CACHÉ
```

---

## 🔑 Points clés à retenir

1. **JWT** = Carte d'identité numérique stockée dans le navigateur
2. **3 parties** : Header . Payload . Signature
3. **Payload** = Les données utilisateur (dont le rôle)
4. **atob()** = Décoder le base64
5. **JSON.parse()** = Convertir en objet JavaScript
6. **Rendu conditionnel** : `{condition && <Element />}`
7. **Double sécurité** : Frontend (UX) + Backend (vraie sécurité)
